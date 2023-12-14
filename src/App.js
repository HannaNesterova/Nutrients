import { useEffect, useState } from 'react';
import './App.css';

//https://api.edamam.com/api/nutrition-details?app_id=6b048013&app_key=1515f87458abc59e82c5b37853ead8e6
//1 show totalNutrients
//2 alert if there is a mistake 
//3 loader after button is clicked
//4 style + RWD


function App() {

  const [search, setSearch] = useState();
  const [wordSubmitted, setWordSubmitted] = useState('');
  const [nutrition, setNutrition] = useState();
  const [ loader, setLoader] = useState(false)


  const MY_KEY = '1515f87458abc59e82c5b37853ead8e6';
  const MY_ID = '6b048013';
  const MY_URL = 'https://api.edamam.com/api/nutrition-details';


  const fetchData = async (ingr) => {
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
        setLoader(false)
        const data = await response.json();
        setNutrition(data);
      } else{
        setLoader(false);
        alert('ingredients entered incorrectly');
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
      let ingr = wordSubmitted.split(/[,,;,\n,\r]/);
      fetchData(ingr);
    }
  },[wordSubmitted])

  return (
    <div>
      <p>Recipes</p> 
    </div>
  );
}

export default App;
