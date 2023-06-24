import React from "react";
import {Drink} from "../../interfaces/interfaces";
import { Card, Image } from 'semantic-ui-react'


interface Prop {
    item:Drink
}

export const DrinksDisplay:React.FC<Prop> = ({item}) => {

    const shortTextDisplay = (text:string | null) => {
        if(text){
            if(text.length === 0) {
                return 'There is no instruction for this item.'
            } else if(text.length > 35){
                return `${text.slice(0, 35)}...`
            } else {
                return text
            }
        } else {
            return 'There is no instruction for this item.'
        }
    }

    return(
            <Card>
                <Image src={item.strDrinkThumb ? item.strDrinkThumb : null} wrapped ui={false} />
                <Card.Content>
                    <Card.Header>{item.strDrink ? item.strDrink : 'No name added'}</Card.Header>
                    <Card.Meta>
                        <span className='date'>{item.strCategory ? item.strCategory : 'No Category added'}</span>
                    </Card.Meta>
                    <Card.Description>
                        {shortTextDisplay(item.strInstructions)}
                    </Card.Description>
                </Card.Content>
                <Card.Content extra>
                    {
                        item.strVideo ?
                            <>
                                <a href={item.strVideo} target={'_blank'} rel={'noreferrer'}>
                                    Watch video instructions
                                </a>
                            </>
                            :
                            <>
                                <p>No video tutorial available</p>
                            </>
                    }
                </Card.Content>
            </Card>
    )
}