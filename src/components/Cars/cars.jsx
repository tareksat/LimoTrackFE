import React, { Component } from "react";
import url from "../../config/urls.json";
import http from "../../services/httpServices";
import global from "../../services/data";
import CarHeader from "./carHeader";
import Table from "./table";
import Paginate from "../common/pagination";
import Rating from "./rating";
import CarModal from "./carModal";
import ConfirmationModal from "../common/confirmationModal";
import _ from "lodash";

export default class Cars extends Component {
  defaultCar = {
    info: {
      name: "",
      platNumber: "",
      fuelConsumptionRate: 0,
      gpsDevice: "",
      activationDate: "",
      expirationDate: "",
      simNumber: "",
      vin: "",
      engineNumber: "",
      color: "",
      tankSize: 0,
      path: "2009e80d3f1d160ab90c8965",
    },
    installation: {
      installedBy: "",
      time: "",
      company: "",
      location: "",
      photos: [],
    },
    parseAlertSettings: {
      engineON: false,
      engineOFF: false,
      doorOpen: false,
      doorClosed: false,
      fuelLeak: false,
      refuel: false,
      speedAlert: false,
      speedLimit: false,
      geoFence: false,
    },
  };

  state = {
    data: [],
    paths: [],
    carModal: false,
    confirmationModal: false,
    selectedCar: {},
    car: {
      info: {
        name: "",
        platNumber: "",
        fuelConsumptionRate: 0,
        gpsDevice: "",
        activationDate: "",
        expirationDate: "",
        simNumber: "",
        vin: "",
        engineNumber: "",
        color: "#ffffff",
        tankSize: 0,
        path: "2009e80d3f1d160ab90c8965",
      },
      installation: {
        installedBy: "",
        time: "",
        company: "",
        location: "",
        photos: [],
      },
      alertSettings: {
        engineON: false,
        engineOFF: false,
        doorOpen: false,
        doorClosed: false,
        fuelLeak: false,
        refuel: false,
        speedAlert: false,
        speedLimit: 0,
        geoFence: false,
      },
    },
    name: "",
    plath: "",
    isEdit: false,
    activePage: 1,
    pageSize: 5,
    selectedPath: 'All'
  };

  async componentDidMount() {
    await this.loadAll();
    await this.loadPaths();
  }

  pickDataKeys = (incoming) => {
    const data = [];
    incoming.map((i) => {
      data.push(_.pick(i, ["_id", "info", "installation", "alertSettings"]));
    });

    return data;
  };

  loadAll = async () => {
    try {
      const res = await http.get(url.cars.load + global.currentGroup._id);
      const data = this.pickDataKeys(res.data);
      console.log("Fetched cars->", data);
      this.setState({ data });
    } catch (e) {
      console.log(e);
    }
  };

  loadPaths = async () => {
    try {
      const { data: paths } = await http.get(
        url.path.load + global.currentGroup._id
      );
      this.setState({ paths });
    } catch (e) {
      console.log(e);
    }
  };

  create = async () => {
    const car = { ...this.state.car };
    const info = {
      ...car.info,
      group: global.currentGroup._id,
      account: global.currentAccount._id,
    };
    delete info.activationDate;
    delete info.expirationDate;
    car.info = info;

    console.log(car);
    try {
      await http.post(url.cars.create, car);
      await this.loadAll();
    } catch (e) {
      console.log(e.response.data);
    }
  };

  remove = async () => {
    try {
      await http.delete(url.cars.remove + this.state.car._id);
    } catch (e) {
      console.log(e);
    }
  };

  update = async () => {
    try {
      const car = { ...this.state.car };
      const info = {...car.info, group: global.currentGroup._id, account: global.currentAccount._id};
      delete info.activationDate;
      delete info.expirationDate;
      await http.put(url.cars.update + this.state.car._id, car);
    } catch (e) {
      console.log(e.response.data);
    }
  };

  filter = () => {
    const name = this.state.name !== "" ? "name" : "path";
    const value = this.state.name !== "" ? this.state.name : this.state.path;

    const regex = new RegExp("^" + value + ".*", "i");
    const filtered = this.state.data.filter((d) => {
      return d[name].search(regex) > -1;
    });
    return filtered;
  };

  getSearchValue = ({ name, value }) => {
    if (name === "name") {
      this.setState({ name: value, path: "" });
    } else {
      this.setState({ path: value, name: "" });
    }
  };

  handleCarInfoInputs = ({ value, name }) => {
    const car = { ...this.state.car };
    const info = { ...car.info };
    info[name] = value;
    car.info = info;
    this.setState({ car });
  };

  handleInstallationInputs = ({ value, name }) => {
    const car = { ...this.state.car };
    const installation = { ...car.installation };
    if (name === "photos") {
      installation.photos.push(value);
    } else {
      installation[name] = value;
    }
    car.installation = installation;
    this.setState({ car });
  };

  handleCarAlertsInputs = ({ value, name }) => {
    const car = { ...this.state.car };
    const alertSettings = { ...car.alertSettings };
    alertSettings[name] = value;
    car.alertSettings = alertSettings;
    this.setState({ car });
  };

  handleModalButtons = async (action) => {
    this.setState({ carModal: false });
    if (action) {
      let data;
      if (!this.state.isEdit) {
        data = [...this.state.data, this.state.car];
        await this.create();
      } else {
        const car = { ...this.state.car };
        data = [...this.state.data];
        const index = data.findIndex((d) => d._id === car._id);
        data[index] = car;
        await this.update();
      }
      this.setState({
        data,
        isEdit: false,
        driver: this.defaultCar,
      });
    }
  };

  handleEditButtons = (car) => {
    this.setState({ car, carModal: true, isEdit: true });
  };

  handleRemoveButton = (car) => {
    this.setState({ car, confirmationModal: true });
  };

  removeSelection = async (action) => {
    if (action) {
      const data = this.state.data.filter((d) => d._id !== this.state.car._id);
      this.setState({ data, activePage: 1 });
      await this.remove();
    }
    this.setState({ confirmationModal: false, car: {} });
  };

  getActivePageNumber = (number) => {
    this.setState({ activePage: number });
  };

  paginate = (data) => {
    const pageNumber = this.state.activePage;
    const pageSize = this.state.pageSize;
    const end = pageNumber * pageSize - 1;
    const start = (pageNumber - 1) * pageSize;
    data = data.slice(start, end + 1);

    return data;
  };

  setSelectedPath = (path) => {
    this.setState({selectedPath: path});
  }

  render() {
    console.log(this.state)
    //const filtered = this.filter();
    //const pageData = this.paginate(filtered);

    return (
      <div style={{ backgroundColor: "#cccccc" }}>
        <ConfirmationModal
          isOpen={this.state.confirmationModal}
          close={this.removeSelection}
        />

        <CarModal
          isOpen={this.state.carModal}
          handleModalButtons={this.handleModalButtons}
          car={this.state.car}
          paths={this.state.paths}
          handleCarInfoInputs={this.handleCarInfoInputs}
          handleInstallationInputs={this.handleInstallationInputs}
          handleCarAlertsInputs={this.handleCarAlertsInputs}
        />

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <CarHeader
            getValues={this.getSearchValue}
            name={this.state.name}
            paths={this.state.paths}
            setSelectedPath={this.setSelectedPath}
            selectedPath={this.state.selectedPath}
          />

          <div
            style={{
              width: "95%",
              backgroundColor: "#ffffff",
              margin: 0,
              boxShadow: "7px 7px 1px #9E9E9E",
            }}
          >
            <Table
              data={this.state.data}
              handleEditButtons={this.handleEditButtons}
              handleRemoveButton={this.handleRemoveButton}
              paths={this.state.paths}
            />
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-around",
              marginTop: 20,
              width: "100%",
            }}
          >
            {/*<Paginate*/}
            {/*    pages={(filtered.length/this.state.pageSize) > 1? (filtered.length/this.state.pageSize):0}*/}
            {/*    activePage={this.state.activePage}*/}
            {/*    getActivePageNumber={this.getActivePageNumber}*/}
            {/*/>*/}
            <button
              className="btn btn-success"
              style={{
                justifySelf: "flex-end",
                height: 64,
                width: 64,
                borderRadius: "50%",
                marginRight: 0,
                fontSize: 36,
                padding: 0,
              }}
              onClick={() => this.setState({ carModal: true })}
            >
              +
            </button>
          </div>
        </div>
      </div>
    );
  }
}
