

function Nutrition({label,quantity,unit}){
return(
    <div >
         <p className="nutrition"><b>{label}:</b>  {quantity.toFixed(2)} {unit}</p>
    </div>
)
}

export default Nutrition;