import React from 'react'
import { Jumbotron, Button } from 'reactstrap';

//import { useHistory } from 'react-router-dom';


const Home=()=>{
    
    return (
        
            <div>
               
                    <Jumbotron className="text-center">
                        <h2 >Welcome to Gurudatta Jewellers Management System</h2>
                        <p> This App is developed By Ankush Supnar</p>
                        <Button tag="a" href="/Login" color="primary">Let's Start</Button>
                       
                </Jumbotron>
               
            </div>
    
    )
}
export default Home