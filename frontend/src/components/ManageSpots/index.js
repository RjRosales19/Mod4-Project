import { useDispatch, useSelector } from "react-redux";
import { getSpots } from "../../store/spots";
import { useEffect } from "react";
import { NavLink ,Link, useHistory } from "react-router-dom";
import './ManageSpots.css'
import OpenModalButton from "../OpenModalButton";
import DeleteSpotModal from "./DeleteSpotModal";

const ManageSpots = () => {
    const dispatch = useDispatch()
    const spots = Object.values(useSelector(state => state.spots.allSpots))
    const user = useSelector(state => state.session.user)
    const currUserSpots = spots.filter( spot => spot.ownerId === user.id)
    const history = useHistory()

    useEffect(() => {
        dispatch(getSpots())
    }, [dispatch])

    const handleEdit = (spotId) => {
        history.push(`/spots/${spotId}/edit`)
    }


    return (
        <div>
            <h1>Manage Your Spots</h1>
            <NavLink exact to="/spots/new">
                <button className='createNewSpot'> Create a New Spot </button>
            </NavLink>
            <div className="user-grid-container">
            {currUserSpots.map(({ id, previewImage, city, state, price, name , avgRating}) => (
                <div className='user-grid-item' key = { id }>
                    <Link className="spot-info-link" to={`/spots/${id}`}>
                        <div className="spot-info-container">
                            <img src={previewImage} alt={`${name}`}></img>
                            <span>
                                <div className='location'>
                                    {city}, {state}
                                    <div className="manage-spots-rating">
                                    <i className="fa fa-star"></i>
                                    {avgRating ? avgRating.toFixed(1) : "New"}
                                    </div>
                                </div>
                                <div className='price'>${Number(price).toFixed(2)} night</div>
                            </span>
                        </div>
                    </Link>
                    <div className="manage-spots-buttons">
                        <button onClick={() => handleEdit(id)}>Update</button>
                        <OpenModalButton modalComponent={<DeleteSpotModal spotId={id}/>} buttonText="Delete"/>
                    </div>

            </div>
            ))}
            </div>
        </div>
    )
}

export default ManageSpots;
