import { useEffect, useState } from 'react';
import './App.css';
import Swal from 'sweetalert2'

import Loader from './Loader/Loader';
import Nutrition from './Nutrition';

//https://api.edamam.com/api/nutrition-details?app_id=6b048013&app_key=1515f87458abc59e82c5b37853ead8e6

function App() {

  const [search, setSearch] = useState(); 
  const [wordSubmitted, setWordSubmitted] = useState(''); 
  const [nutrition, setNutrition] = useState();
  const [loader, setLoader] = useState(false) ;

  const MY_KEY = '1515f87458abc59e82c5b37853ead8e6';
  const MY_ID = '6b048013';
  const MY_URL = 'https://api.edamam.com/api/nutrition-details';

  const analyzeNutrition = async (ingr) => { 
    setLoader(true);

      const response = await fetch(`${MY_URL}?app_id=${MY_ID}&app_key=${MY_KEY}`,{
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ingr: ingr })  
      });
      if(response.ok){
        setLoader(false);

        const data = await response.json();
        setNutrition(data); 
      } else{
        setLoader(false);

        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Ingredients entered incorrectly",
        });
      }
  }
  const myNutritionSearch = (e) => {
    e.preventDefault();
    setSearch(e.target.value);
  }
  const finalSearch = (e) => {
    e.preventDefault();
    setWordSubmitted(search);
  }
   useEffect(()=> {
     if(wordSubmitted !== ''){
       let ingr = wordSubmitted ? wordSubmitted.split(/[,,;,\n,\r]/) : [];
       analyzeNutrition(ingr); 
     } 
   },[wordSubmitted])

  return (
    <div>
    <h1>Nutrition Analysis</h1>
      {loader && <Loader />}
      

      <input type='text' placeholder='Type your ingredient...' onChange={myNutritionSearch}/>
      <button  onClick={finalSearch}>Look for</button>
      <p className='wordSubmitted'>Your ingredient is: {wordSubmitted}</p> 

      <div>
        {nutrition && Object.values(nutrition.totalNutrients).map(
          ({label,quantity,unit})=>
            <Nutrition key={label}
            label={label}
            quantity={quantity}
            unit={unit}
        />
          )
        }
      </div>
    </div>
  );
}

export default App;
