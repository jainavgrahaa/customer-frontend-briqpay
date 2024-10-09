/* eslint-disable @next/next/no-img-element */
export default function PerfectGiftContent({
  heading,
  content,
  img,
  alt,
  link,
  linkText,
  icon,
}) {
  return (
    <div className="perfect-gift-content">
      <h3> {heading}</h3>
      <p>{content}</p>
      <div className="perfect-gift-content-img">
        <img src={img} alt={alt} />
        <a href={link || "#"}>
          {linkText} <span className="material-icons-outlined">{icon}</span>
        </a>
      </div>
    </div>
  );
}
