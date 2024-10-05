import {Link} from "react-router-dom"
function MyButton({className,text,width,height,margin,padding,background,textDecoration,fontWeight,fontSize,color,fontFamily,boxShadow,href,icon,target,onClick}){
    let buttonClasses = "btn"
    if(className){
        buttonClasses = `btn ${className}`;
    }else{
        // nothign
    }
    const CustomStyle = {
        width,
        height,
        margin,
        padding,
        background,
        textDecoration,
        fontWeight,
        fontSize,
        color,
        fontFamily,
        boxShadow,

    }
    return (
        <>
        {
        icon?
            (<Link style={CustomStyle} className={`share-btn ${buttonClasses}`} to={href} target={target} onClick={onClick}>
                <span className="material-symbols-outlined">
                    {icon}
                </span>
                {text}</Link>)
            :
            (<Link style={CustomStyle} className={buttonClasses} to={href} target={target} onClick={onClick}> {text}</Link>)
        }
        </>
        
    )
}

export default MyButton