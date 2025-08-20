import { useState } from 'react';
import { FaStar } from 'react-icons/fa';

export const RatingStars = ({onRate,initialRate=0}) => {
    const [rate, setRate] = useState(initialRate);
    const handleRating = (givenRating) => {
        setRate(givenRating);
        if (onRate) onRate(givenRating);
    };
    return (
            <div style={{ display: "flex", gap: "5px", cursor: "pointer" }}>
                {[...Array(5)].map((_, index) => {
                    const givenRating = index + 1;
                    return (
                        <label key={index}>
                            <input
                                type="radio"
                                name="rating"
                                value={givenRating}
                                style={{ display: "none" }}
                                onClick={() =>handleRating(givenRating)}
                            />
                            <FaStar
                                size={24}
                                color={givenRating <= rate ? "#ffc107" : "#e4e5e9"}
                            />
                        </label>
                    );
                })}
            </div>
    )
}
