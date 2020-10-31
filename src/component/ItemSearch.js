import React,{Component} from 'react'
import './Customersearch.css'
import {Input} from 'reactstrap'
export default class ItemSearch extends Component
{
    constructor(props)
    {
        super(props);
        this.items=[
            "Gold Ring",
            "Silver Jode",
            "Platinum Ring",
            "Mangalsutra",
            "Ring",
            "Karnafhul",
            "Diamond Ring",
            "Other"
        ];
        this.state={
            suggestions:[],
            text:''
        }
    }
    onTextChanged =(e)=>{
            const value = e.target.value;
            let suggestions=[];
            if(value.length>0){
                const regex = new RegExp(`^${value}`,'i');
                suggestions = this.items.sort().filter(v=>regex.test(v));
            }
            this.setState(()=>({suggestions,text:value}));
    }
    suggestionSelected(value){
        this.setState(()=>({
            text:value,
            suggestions:[]
        }));
    }
    renderSuggestions(){
        const {suggestions}=this.state;
        if(suggestions===0){
            return null;
        }
        return(
            <ul>
                    {suggestions.map((item)=><li key={item} onClick={()=>this.suggestionSelected(item)}>{item}</li>)}
                </ul>
        )
    }

    render(){
        const {text}=this.state;
        return (
            <div className="AutoComplteText"> 
                <Input type="text" value={text} onChange={this.onTextChanged}/>
                {this.renderSuggestions()}
            </div>
        )
    }
}