import React from 'react';
import {Card} from "react-bootstrap";
import StarRatings from "react-star-ratings";
import Modal from "react-modal";

const Rating = (props) => {

    return (
        <div>
            <Modal
                isOpen={props.isOpen}
                contentLabel='ItemModal'
                ariaHideApp={false}
                style={customStyles}
            >

                    <StarRatings
                        rating={props.ratingValue}
                        starRatedColor="gold"
                        //starEmptyColor="blue"
                        inHalf={true}
                        changeRating={(e) => props.getRating(e)}
                        numberOfStars={5}
                        name='rating'
                        starDimension="100px"
                        starSpacing="15px"
                    />

            </Modal>
        </div>
    )
}

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        opacity: 0.9,
        padding: 0,
        boxShadow: "5px 5px 1px #9E9E9E",
        overflow: 'hide'
    }
};

export default Rating;