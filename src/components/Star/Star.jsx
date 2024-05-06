import { FaStar, FaStarHalf } from "react-icons/fa";

export default function Star({ star }) {
    const quantityStar = Math.floor(Number(star));
    const isHalfStar = Math.ceil(Number(star)) !== quantityStar;

    return (
        <>
            {
                new Array(quantityStar).fill(1).map((item, index) => 
                    <FaStar color="orange" key={index}/>
                )
            }
            {
                isHalfStar && <FaStarHalf color="orange"/>
            }
        </>
    )
}