import "./styles.css";

export default function EdgeCell({src, alt, direction}) {
    const positionClass = `edge__img-${direction}`;
    return (
        <div className="board__element board__element-edge">
            <img
                src={src}
                alt={alt}
                className={`edge__img ${positionClass} border`}
            />
        </div>
    );
}