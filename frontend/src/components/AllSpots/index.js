import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { getSpots } from '../../store/spots'
import { Link } from 'react-router-dom'
import React from 'react'
import "./AllSpots.css"

const AllSpots = () => {
    const dispatch = useDispatch()
    const spots = Object.values(useSelector(state => state.spots.allSpots ));


    useEffect(() => {
        dispatch(getSpots())
    }, [dispatch])

    if(!spots.length) return null

    return (
        <section>
                <ul>
                    {/* <h1>All Spots</h1> */}
                    <div className='grid-container'>
                        {spots.map(({ id, previewImage, city, state, price, name, avgRating }) => (
                            <div className='grid-item' key = { id }>
                                <Link className="spot-info-link" to={`/spots/${id}`}>
                                    <div className="spot-info-container">
                                        <img src={previewImage} alt={`${name}`} title={name}></img>
                                        <div className='spot-info'>
                                            <div className='location'>{city}, {state}</div>
                                            <div className='price'>${price} night</div>

                                            <span className="rating">
                                                <i className="fa fa-star"></i>
                                                {avgRating ? avgRating.toFixed(1) : "New"}
                                            </span>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                            ))}
                        </div>
                </ul>
        </section>
    )
}

export default AllSpots
