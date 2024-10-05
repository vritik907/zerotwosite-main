import "../styles/SectionWithImage.css"
import {Link} from "react-router-dom"
function RenderContent({heading, paragraph, buttons }){
    return (
                <div className="content">
                    <h1>{heading}</h1>
                    <p>{paragraph}</p>
                    <div className="section-btn-div">
                    {buttons.map((button, index) => (
                        <Link className="section-btn btn " key={index} to={button.href}>
                        {button.text}
                        </Link>
                    ))}
                    </div>
                </div>
            );
        }

function RenderImage({imageSrc,imageAlt}){
    if (imageSrc) {
      return <div className="section-image"> <img  src={imageSrc} alt={imageAlt} /> </div>;
    } else {
      return <div className="section-image "> <div className="placeholder-image" /></div>;
    }
  };

function SectionWithImage({ imageSrc, imageAlt, heading, paragraph, buttons, imageOnLeft }){
 

  return (
    <div className={`section-with-image ${imageOnLeft ? 'image-on-left' : 'image-on-right'}`}>
      <div className="section-content">
        {imageOnLeft ? (
          <>
            <RenderImage  imageAlt={imageAlt} imageSrc={imageSrc}/>
            <RenderContent 
        heading={heading}
        paragraph={paragraph}
        buttons={buttons}
        imageOnLeft={imageOnLeft} />
          </>
        ) : (
          <>
            <RenderContent  imageAlt={imageAlt}
        heading={heading}
        paragraph={paragraph}
        buttons={buttons}
        imageOnLeft={imageOnLeft}/>
            <RenderImage imageAlt={imageAlt} imageSrc={imageSrc}/>
            
          </>
        )}
      </div>
    </div>
  );
};

export default SectionWithImage;
