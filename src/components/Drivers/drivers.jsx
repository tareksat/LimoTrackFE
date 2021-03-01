import React, {Component} from "react";
import url from '../../config/urls.json';
import http from '../../services/httpServices';
import global from "../../services/data";
import CarHeader from "./carHeader";
import Table from "./table";
import Paginate from "../common/pagination";
import Rating from "./rating";
import DriverModal from "./driverModal";
import ConfirmationModal from "../common/confirmationModal";
import _ from "lodash";

export default class Drivers extends Component {
    state = {
        data: [],
        name: '',
        phone: '',
        ratingModal: false,
        driverModal: false,
        confirmationModal: false,
        selectedDriver: {},
        driver: {
            _id: '',
            name: '',
            phone: '',
            address: '',
            car: '',
            rating: 0
        },
        isEdit: false,
        activePage: 1,
        pageSize: 5,
    }

    async componentDidMount() {
        await this.loadAll();
    }

    pickDataKeys = (incoming) => {
        const data = []
        incoming.map(i => {
            data.push(_.pick(i, ['_id', 'name', 'phone', 'address', 'car', 'rating']))
        });

        for (let driver of data) {
            driver.rating = driver.rating.value;
        }
        return data;
    }

    loadAll = async () => {
        try {
            const res = await http.get(url.drivers.load + global.currentGroup._id);
            const data = this.pickDataKeys(res.data);
            this.setState({data});
        } catch (e) {
            console.log(e);
        }
    }

    create = async () => {
        const {name, address, phone, car} = this.state.driver;
        try {
            await http.post(url.drivers.create, {
                name, address, phone, car, group: global.currentGroup._id, account: global.currentAccount._id
            });
            await this.loadAll();
        } catch (e) {
            console.log(e.response.data);
        }
    }

    remove = async () => {
        try {
            await http.delete(url.drivers.remove + this.state.driver._id);
        } catch (e) {
            console.log(e);
        }
    }

    update = async () => {
        try {
            let driver = {...this.state.driver};
            driver.group = global.currentGroup._id;
            driver.account = global.currentAccount._id;
            driver = _.pick(driver, ['name', 'phone', 'car', 'address', 'account', 'group']);
            await http.put(url.drivers.update + this.state.driver._id, driver);
        } catch (e) {
            console.log(e.response.data);
        }
    }

    rate = async (val, id) => {
        try {
            await http.post(url.drivers.update + 'rate/' + id + '/' + val);
            await this.loadAll();
        } catch (e) {
            console.log(e);
        }
    }

    openRating = (driver) => {
        this.setState({
            driver,
            ratingModal: true
        });
    }

    getRating = async (val) => {
         const driver = {...this.state.driver};
        await this.rate(val, driver._id);
        this.setState({ratingModal: false});
    }

    filter = () => {
        const name = this.state.name !== '' ? 'name' : 'phone';
        const value = this.state.name !== '' ? this.state.name : this.state.phone;

        const regex = new RegExp('^' + value + '.*', 'i');
        const filtered = this.state.data.filter((d) => {
            return (d[name].search(regex) > -1);
        });
        return filtered;
    }

    getSearchValue = ({name, value}) => {
        if (name === 'name') {
            this.setState({name: value, phone: ''});
        } else {
            this.setState({phone: value, name: ''})
        }
    }

    handleDriverModalInputs = ({value, name}) => {
        const driver = {...this.state.driver};
        driver[name] = value;
        this.setState({driver});
    }

    handleModalButtons = async (action) => {
        this.setState({driverModal: false});
        if (action) {
            let data;
            if (!this.state.isEdit) {
                data = [...this.state.data, this.state.driver];
                await this.create();
            } else {
                const driver = {...this.state.driver};
                data = [...this.state.data];
                const index = data.findIndex(d => d._id === driver._id);
                data[index] = driver;
                await this.update();
            }
            this.setState({
                data, isEdit: false, driver: {
                    _id: '',
                    name: '',
                    phone: '',
                    address: '',
                    car: '',
                    rating: 0
                }
            });
        }
    }

    handleEditButtons = (driver) => {
        this.setState({driver, driverModal: true, isEdit: true})
    }

    handleRemoveButton = (driver) => {
        this.setState({driver, confirmationModal: true})
    }

    removeSelection = async (action) => {
        if (action) {
            const data = this.state.data.filter(d => d._id !== this.state.driver._id);
            this.setState({data, activePage: 1});
            await this.remove();
        }
        this.setState({confirmationModal: false, driver: {_id: '', name: '', phone: '', car: '', address: ''}})
    }

    getActivePageNumber = (number) => {
        this.setState({activePage: number})
    }

    paginate = (data) => {
        const pageNumber=this.state.activePage;
        const pageSize = this.state.pageSize;
        const end = (pageNumber * pageSize) -1;
        const start = (pageNumber - 1) * pageSize;
        data = data.slice(start, end+1);

        return data
    }

    render() {

        const filtered = this.filter();
        const pageData = this.paginate(filtered);

        return (
            <div style={{backgroundColor: '#cccccc'}}>

                <Rating
                    isOpen={this.state.ratingModal}
                    getRating={this.getRating}
                    ratingValue={this.state.selectedDriver.rating}
                />

                <DriverModal
                    isOpen={this.state.driverModal}
                    driver={this.state.driver}
                    handleDriverModalInputs={this.handleDriverModalInputs}
                    handleModalButtons={this.handleModalButtons}
                />

                <ConfirmationModal
                    isOpen={this.state.confirmationModal}
                    close={this.removeSelection}
                />

                <div  style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                    <CarHeader
                        getValues={this.getSearchValue}
                        name={this.state.name}
                        phone={this.state.phone}
                    />

                    <div
                        style={{width: '95%', backgroundColor: '#ffffff', margin: 0, boxShadow: "7px 7px 1px #9E9E9E"}}>
                        <Table
                            data={pageData}
                            rate={this.openRating}
                            handleEditButtons={this.handleEditButtons}
                            handleRemoveButton={this.handleRemoveButton}
                        />
                    </div>

                    <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-around', marginTop: 20, width: '100%'}}>
                        <Paginate
                            pages={(filtered.length/this.state.pageSize) > 1? (filtered.length/this.state.pageSize):0}
                            activePage={this.state.activePage}
                            getActivePageNumber={this.getActivePageNumber}
                        />
                        <button
                            className='btn btn-success'
                            style={{
                                 justifySelf: 'flex-end',
                                 height: 64,
                                 width: 64,
                                 borderRadius: '50%',
                                marginRight: 0,
                                 fontSize: 36,
                                 padding: 0
                            }}
                            onClick={() => this.setState({driverModal: true})}

                        >+
                        </button>
                    </div>
                </div>
            </div>
        )
    }
}