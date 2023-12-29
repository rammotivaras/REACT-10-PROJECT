import NumberSelector from "./NumberSelector"
import RoleDice from "./RoleDice";
import TotalScore from "./TotalScore"
import styled from "styled-components";
import { useState } from "react";
import { Button } from "./styled/Button";
import { OutlineButton } from "./styled/Button";
import Rules from "./Rules";
const GamePlay = () => {  
  const [score, setScore] = useState(0);
  const [selectedNumber,  setSelectedNumber] = useState();
  const [currentDice, setCurrentDice] = useState(1); 
   const [error, setError] = useState("");
   const [showRules, setShowRules] = useState(false);
  const generateRandomNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min) + min );
  } ;
const  roleDice = () => {
  if(!selectedNumber){
  setError("you have not selected any number")
    return ;
  }  
 
  const randomNumber = generateRandomNumber(1,7); 
  setCurrentDice((prev)=> randomNumber) 
  if (selectedNumber == randomNumber) {
    setScore((prev)=> prev + randomNumber) ;
  }else{
    setScore(prev => prev - 2);
  } 
  setSelectedNumber(undefined);
}

const resetScore =()=>{
  setScore(0);
}
  return (
    <MainContainer>
    <div className="top_section">
      <TotalScore score={score}/>
        <NumberSelector 
        error={error}
        setError={setError}
          selectedNumber={selectedNumber}
          setSelectedNumber={setSelectedNumber}/>

    </div>
    <RoleDice 

      currentDice={currentDice}
      roleDice={roleDice}
    />
    <div className="btns">
      <OutlineButton 
      onClick={resetScore}
      >Reset Score</OutlineButton>
      <Button
      onClick={()=> setShowRules(prev => !prev)}
      >{showRules ? "Hide Rules" : "Show Rules"}</Button>
    </div>
    {showRules && <Rules/> }
    
    </MainContainer>
  )
}

export default GamePlay ; 
 
const MainContainer = styled.div`  
padding-top: 70px;
.top_section {
    display: flex;
    justify-content: space-between;
    align-items: end; 
    /* padding: 8px 32px;  */  
    max-width: 1080px; 
    margin: 0 auto;
}
.btns {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
  margin-top: 20px;
}
overflow: hidden;
`
