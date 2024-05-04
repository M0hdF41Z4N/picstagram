import PropTypes from "prop-types";

export default function Image({src,caption}) {
    return (
        <div className="w-full h-full">
            <img className="w-full h-full object-cover" 
            src={src} alt={caption}/>
        </div>
    )
}

Image.propTypes = {
    src: PropTypes.string.isRequired,
    caption : PropTypes.string.isRequired
}