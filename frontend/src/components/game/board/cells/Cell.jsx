import "./styles.css";

export default function Cell({src, alt, direction, mirror = false, noneUpgrades = false, specialType, property}) {
    const baseClass = `object-${direction}`;
    const priceClass = specialType
        ? `${baseClass}__price ${baseClass}__price-${specialType}`
        : `${baseClass}__price`;
    const cellClass = noneUpgrades
        ? `${baseClass}__cell ${baseClass}__cell-none-upgrades`
        : `${baseClass}__cell`;
    return (
        <div className={` ${baseClass} ${mirror && "mirror"} border`}>
            <div className={priceClass + (property?.member ? " object-gold-on-step" : "")}>
                {!property?.member && property?.upgrades.find(upgrade => upgrade.level === 'LEVEL_1').price}
                {property?.member && property?.upgrades.find(upgrade => upgrade.level === 'LEVEL_1').goldOnStep}
            </div>
            <div className={cellClass + (property?.member ? (" color-" + property.member.color + "-g") : "")}>
                <img src={src} alt={alt} className="cell-img"/>
            </div>
            {noneUpgrades ? null : <div className={`${baseClass}__upgrades`}></div>}
        </div>
    );
}