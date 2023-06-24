import React, {useCallback, useEffect} from 'react'
import { Search } from 'semantic-ui-react'
import {Drink} from "../../interfaces/interfaces";
import axios from "axios";
import useState from 'react-usestateref';
import useDebounce from "../../hooks/searchHook/searchHook";
import { useDispatch } from 'react-redux'
import {setSearchDataList} from "../../features/cearchDataSlice";
import {AlertError} from "../../App";


const initialState = {
    loadings: false,
}

function exampleReducer(state:any, action:any) {
    switch (action.type) {
        case 'CLEAN_QUERY':
            return initialState
        case 'START_SEARCH':
            return { ...state, loadings: true }
        case 'FINISH_SEARCH':
            return { ...state, loadings: false }
        case 'UPDATE_SELECTION':
            console.log(action.selection)
            return { ...state }

        default:
            throw new Error()
    }
}

function SearchExampleStandard() {
    // USE THIS REDUCER TO TRACK LOADING AS DEBOUNCING HASe ITS OWN TIMER
    const [state, dispatch] = React.useReducer(exampleReducer, initialState)
    const { loadings } = state

    const [data, setData] = useState<Drink[]>([])
    const [search, setSearch] = useState<string>('')
    const [open, setOpen] = useState(false)

    const debouncedSearch = useDebounce(search, 500)

    // SET REDUX STATE FOR SEARCH DATA
    const dispatcher = useDispatch()

    const setSearchDataOnRedux = useCallback((obj_list:Drink[]) => {
        dispatcher(setSearchDataList(obj_list))
    },[dispatcher])


    const searchAPI = useCallback(() => {
        setData([])
        setSearchDataOnRedux([])
        setOpen(false)

        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${debouncedSearch}`,
            headers: { }
        };

        axios.request(config)
            .then((response) => {
                if(response.data?.drinks){
                    setData(response.data.drinks as Drink[])
                    setSearchDataOnRedux(response.data.drinks as Drink[])
                    dispatch({
                        type: 'FINISH_SEARCH',
                    })
                    if(response.data.drinks.length !== 0) {
                        setOpen(true)
                    } else {
                        setOpen(false)
                    }
                }
            })
            .catch((error) => {
                setData([])
                dispatch({
                    type: 'FINISH_SEARCH',
                })
                AlertError(error.message)

            });
    },[debouncedSearch, setSearchDataOnRedux])

    useEffect(() => {
        if(debouncedSearch) {
            searchAPI()
        } else {

            setData([])
            setSearchDataOnRedux([])
            dispatch({ type: 'CLEAN_QUERY' })
            setOpen(false)
        }
    },[
        debouncedSearch,
        setSearchDataOnRedux,
        searchAPI
    ])



    /** FORMING THE DATA SO THE DROPDOWN WILL UNDERSTAND IT. **/
    interface List {
        title:string | null
    }
    const [formed_res, setFormed_res] = useState<List[]>([])

    useEffect(() => {
        setFormed_res([])

        let new_list = []
        for (let i of data){
            let obj = {
                title: i.strDrink
            }
            new_list.push(obj)

        }
        setFormed_res(new_list)

    },[data])

    /** MANAGE THE SEARCH BAR TO BE OPEN WHEN DATA IN SEARCH BAR **/
    const [element, setElement] = useState<undefined | Element>()

    useEffect(() => {
        if(open){
            let i = document.getElementsByClassName('results transition')
            setElement(i[0])
        } else {
            setElement(undefined)
        }

    },[open])


    /** MANAGE TO KEEP DROP DOWN OPEN BY OVER RIDING THE JS COMING FROM SEMANTIC UI **/
    useEffect(() => {
        let ticker:NodeJS.Timeout;
        if(element && open){
            ticker = setInterval(() => {
                if(element && element.className === 'results transition'){
                    element.className = 'results transition visible'
                }
            }, 500)
        }

        return () => {
            clearInterval(ticker)
            if(element){
                element.className = 'results transition'
            }
        }
    },[element, open])


    return (
        <div>
            <div>
                <Search
                    id={'search'}
                    loading={loadings}
                    placeholder='Search...'
                    onResultSelect={(e, data) => {
                        dispatch({ type: 'UPDATE_SELECTION'})
                        setSearch(data.result.title)
                    }}
                    onSearchChange={(e, data) => {
                        setSearch(data.value ? data.value : '')
                        dispatch({ type: 'START_SEARCH' })
                    }}
                    results={formed_res}
                    value={search}
                />
            </div>
        </div>
    )
}

export default SearchExampleStandard

