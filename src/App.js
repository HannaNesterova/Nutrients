import { useEffect, useState } from 'react';
import './App.css';
import Loader from './Loader/Loader';

//https://api.edamam.com/api/nutrition-details?app_id=6b048013&app_key=1515f87458abc59e82c5b37853ead8e6
//1 show totalNutrients
//2 alert if there is a mistake 
//3 loader after button is clicked
//4 style + RWD


function App() {

  const [search, setSearch] = useState(); // это input?
  const [wordSubmitted, setWordSubmitted] = useState('1 avocado'); // это введенное слово? 
  const [nutrition, setNutrition] = useState(); // за что это отвечает, вывод на страницу ингридиента?
  const [loader, setLoader] = useState(false) // это лоадер


  const MY_KEY = '1515f87458abc59e82c5b37853ead8e6';
  const MY_ID = '6b048013';
  const MY_URL = 'https://api.edamam.com/api/nutrition-details';

  //почему мы создаем константу, если с API через useEffect работаем всегда,
  //и что это вобще за константа  и почему она принимает в себя весь функционал 
  //responsa и data?
  const fetchData = async (ingr) => { //почему мы сюда передаем ingr ?
    setLoader(true);

      const response = await fetch(`${MY_URL}?app_id=${MY_ID}&app_key=${MY_KEY}`,{
        method: 'POST',
        headers: {
          'Accept': 'application/json',//что это и зачем ?
          'Content-Type': 'application/json',//что это и зачем ?
        },
        body: JSON.stringify({ ingr: ingr })  //что это и зачем ?
      });
      if(response.ok){
        setLoader(false);

        const data = await response.json();
        setNutrition(data); //почему мы все это сюда пишем ?
      } else{
        setLoader(false);
        alert('ingredients entered incorrectly');
      }
  }
  const myNutritionSearch = (e) => {
    e.preventDefault();
    setSearch(e.target.value);
    console.log(e.target.value)
  }
  const finalSearch = (e) => {
    e.preventDefault();
    setWordSubmitted(search);
  }
   useEffect(()=> {
     if(wordSubmitted !== ''){
       let ingr = wordSubmitted.split(/[,,;,\n,\r]/);
       fetchData(ingr); // почему мы сюда передаем это и что это ?
     }
   },[wordSubmitted])

  return (
    <div>
      {loader && <Loader />}

      <input type='text' placeholder='Type your ingredient...' onChange={myNutritionSearch}/>
      <button  onClick={finalSearch}>Look for</button>
      <p>Recipes</p> 

      <div>
        {nutrition && <p>{nutrition.calories}</p>}
      </div>
    </div>
  );
}

export default App;
