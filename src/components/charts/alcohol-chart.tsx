import React, {useEffect, useState} from 'react';
import './charts.scss'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import {useSelector} from "react-redux";
import {RootState} from "../../app/store";
import {Drink} from "../../interfaces/interfaces";
import {ChartIF} from "../../interfaces/interfaces";
import useWindowSize from "../../hooks/windowSizeHook/window-sixe";

ChartJS.register(ArcElement, Tooltip, Legend);

/** Redux state filtered in to 2 pie charts, this state hold the data regarding what item is displayed on screen atm. **/

export const Charts = () => {

    let {width} = useWindowSize()

    const letterDataState = useSelector((state:RootState) => state.letterData.searchData)

    const [alcohol_, setAlcohol_] = useState<ChartIF | null>(null)
    const [glass_, setGlass_] = useState<ChartIF | null>(null)
    const [glass_color, setGlass_color] = useState<string[]>([])

    //generate random colors for glass type
    const generatorBG = (list:string[]) => {
            const min = 0
            const max = 255
            const randomBetween = (min:number, max:number) => min + Math.floor(Math.random() * (max - min + 1));
            let bg_list = list.map((item) => item.replace(item, `rgba(${randomBetween(min, max)}, ${randomBetween(min, max)}, ${randomBetween(min, max)}, 0.2)`))
            setGlass_color(bg_list)
    }

    const generateBorder = (list:string[]) => {
        return list.map((item) => item.replace('0.2', '1'))

    }

    //filter data based on glass type
    const GlassFilter = (list:Drink[]) => {
        // ES5 <--- solution
        let glasses = list.map(item => item.strGlass).filter((value, index, self) => self.indexOf(value) === index)
        // ES2015 <--- solution
        //let glass = [...new Set(list.map(item => item.strGlass))]
        /** My code compile to es5 **/
        let data = []
        for(let i of glasses){
            let filter = list.filter((el) => el.strGlass === i)
            data.push(filter.length)
        }
        if(glasses && data) {
            generatorBG(glasses as string[])

            let data_: ChartIF = {
                labels: glasses as string[],
                datasets: [
                    {
                        label:'Glasses',
                        data: data,
                        backgroundColor: glass_color,
                        borderColor: generateBorder(glass_color),
                        borderWidth: 1
                    }
                ]
            }
            setGlass_(data_)
        }
    }

    //filter data based on alcohol content
    const AlcoholFilter = (list:Drink[]) => {
        let af = list.filter((el) => el.strAlcoholic === 'Alcoholic')
        let naf = list.filter((el) => el.strAlcoholic === 'Non alcoholic')

        if(af && naf){
            let data: ChartIF = {
                labels: ['Alcoholic', 'Non alcoholic'],
                datasets: [
                    {
                        label:'Alcohol content',
                        data:[af.length, naf.length],
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.2)',
                            'rgba(54, 162, 235, 0.2)',
                        ],
                        borderColor: [
                            'rgba(255, 99, 132, 1)',
                            'rgba(54, 162, 235, 1)',
                        ],
                        borderWidth: 1
                    }
                ]
            }
            setAlcohol_(data)
        }
    }

    useEffect(() => {
        if(letterDataState.length !== 0){
            AlcoholFilter(letterDataState)
            GlassFilter(letterDataState)
        } else {
            AlcoholFilter(letterDataState)
            let data_: ChartIF = {
                labels: ['No glass'],
                datasets: [
                    {
                        label:'Glasses',
                        data: [0],
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.2)',
                        ],
                        borderColor: [
                            'rgba(255, 99, 132, 1)',
                        ],
                        borderWidth: 1
                    }
                ]
            }
            setGlass_(data_)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[
        letterDataState
    ])

    return (
        <section className={width && width >= 800 ? 'charts-section' : 'charts-section charts-mobile'}>
            <div>
                {
                    alcohol_ ?
                        <>
                            <Pie data={alcohol_} />
                        </>
                        :
                        <>
                            No relevant data to show.
                        </>
                }
            </div>
            <div>
                {
                    glass_ ?
                        <>
                            <Pie data={glass_} />
                        </>
                        :
                        <>
                            No relevant data to show.
                        </>
                }
            </div>
        </section>
    )
}
