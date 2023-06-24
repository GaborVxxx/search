import React, { SyntheticEvent, useCallback, useEffect } from 'react'
import './main-display.scss'
import { Tab } from 'semantic-ui-react'
import axios from 'axios'
import { TabData, Drink } from '../../interfaces/interfaces'
import { DrinksDisplay } from '../drinks-display/drinks-display'
import MessageExampleIcon from '../loading/loading'
import SearchExampleStandard from '../ui-search/ui-search'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../app/store'
import { setTubData } from '../../features/tabSlice'
import { setLetterDataList } from '../../features/letterFilterDataSlice'
import useState from 'react-usestateref'
import { AlertError } from '../../App'
import useWindowSize from '../../hooks/windowSizeHook/window-sixe'

export const MainDisplay: React.FC = () => {
  let { width } = useWindowSize()

  // base data to generate tub header
  const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('')

  // REDUX
  const dispatcher = useDispatch()

  const setTubDataOnRedux = useCallback(
    (tub: string) => {
      dispatcher(setTubData(tub))
    },
    [dispatcher]
  )

  const setLetterDataOnRedux = useCallback(
    (obj_list: Drink[]) => {
      dispatcher(setLetterDataList(obj_list))
    },
    [dispatcher]
  )

  // REDUX STATES
  const tubState = useSelector((state: RootState) => state.tab.tab)

  const searchDataState = useSelector(
    (state: RootState) => state.searchData.searchData
  )

  /**************** PAGE STATE *******************/
  enum Id {
    NoItem,
    NormalState,
    FilterState,
    SingleState,
  }
  const [element, setElement, elementRef] = useState<Id>(Id.NoItem)

  useEffect(() => {
    if (searchDataState.length === 0) {
      setElement(Id.NormalState)
    } else if (searchDataState.length === 1) {
      setElement(Id.SingleState)
    } else {
      setElement(Id.FilterState)
    }
  }, [
    searchDataState.length,
    Id.NormalState,
    Id.SingleState,
    Id.FilterState,
    setElement,
  ])
  /********************************************* END OF PAGE STATE */

  /************************************* ID FOR SET TAB TO "a" WHEN ITEM COME TO DOME *******************************/

  let u = document.getElementById('frtger4-item')

  useEffect(() => {
    if (u) {
      setTubDataOnRedux('a')
    }
  }, [u, setTubDataOnRedux])

  /****************************************** END OF ID */

  /********************************NORMAL FUNCTION WHEN ONLY USING FIRST LETTER TO FILTER ******************************/
  /*** In use when app in NormalState ***/
  const [drink_by_letter, setDrink_by_letter] = useState<Drink[]>([])
  const [loading, setLoading] = useState(false)

  let panes = []

  const filterTabDataOnChange = (data: TabData) => {
    for (let i in data.panes) {
      if (Number(i) === Number(data.activeIndex)) {
        setTubDataOnRedux(data.panes[Number(i)].menuItem.toLowerCase())
      }
    }
  }

  useEffect(() => {
    setDrink_by_letter([])
    setLoading(true)
    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: `https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${tubState}`,
      headers: {},
    }

    axios
      .request(config)
      .then((response) => {
        if (response.data) {
          if (response.data.drinks) {
            /*** Using the reference for the state to avoid the stale state. ***/
            if (elementRef.current === 1) {
              setLetterDataOnRedux(response.data.drinks as Drink[])
            }

            setDrink_by_letter(response.data.drinks as Drink[])
            setLoading(false)
          } else {
            if (elementRef.current === 1) {
              setLetterDataOnRedux([])
            }
            setDrink_by_letter([])
            setLoading(false)
          }
        }
      })
      .catch((error) => {
        setDrink_by_letter([])
        setLoading(false)
        // only use alert BUT just to keep it simple!
        AlertError(error.message as string)
      })

    /** Mute eslint as I need the current state here as dependency **/
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tubState, elementRef.current, setLetterDataOnRedux])

  const handleTubChange = (event: SyntheticEvent, data: Object) =>
    filterTabDataOnChange(data as TabData)

  for (let i of alphabet) {
    const item = {
      menuItem: i.toUpperCase(),
      render: () => (
        <Tab.Pane>
          {!loading ? (
            <>
              {drink_by_letter.map((item) => (
                <DrinksDisplay item={item} key={item.idDrink} />
              ))}
            </>
          ) : (
            <>
              <MessageExampleIcon />
            </>
          )}
        </Tab.Pane>
      ),
    }
    panes.push(item)
  }

  /**********************************************END OF NORMAL FUNCTION WHEN ONLY USING FIRST LETTER TO FILTER*/

  /********************************FILTER FUNCTION ******************************/
  /*** In use when app in FilterState ***/
  /** Here we need to use reference for the API call as its async code and remember the element state as it was
   * in the prev render cycle. But adding a reference call it will run just fine. Other UseEffect call no need this,
   * as they are synchronous.
   */
  let filter_panes = []

  const [filtered_item_list, setFiltered_item_list] = useState<Drink[]>([])

  const filterTabDataOnChangeFilter = (data: TabData) => {
    for (let i in data.panes) {
      if (Number(i) === Number(data.activeIndex)) {
        setTubDataOnRedux(data.panes[Number(i)].menuItem.toLowerCase())
      }
    }
  }

  const handleTubChangeFilter = (event: SyntheticEvent, data: Object) =>
    filterTabDataOnChangeFilter(data as TabData)

  useEffect(() => {
    let filtered_list: Drink[] = []
    for (let i of searchDataState) {
      if (i.strDrink) {
        if (i.strDrink.slice(0, 1).toLowerCase() === tubState) {
          filtered_list.push(i)
        }
      }
    }

    if (element === 2) {
      setLetterDataOnRedux(filtered_list)
    }
    setFiltered_item_list(filtered_list)
  }, [tubState, searchDataState, element, setLetterDataOnRedux])

  for (let i of alphabet) {
    const item = {
      menuItem: i.toUpperCase(),
      render: () => (
        <Tab.Pane>
          {filtered_item_list.map((item) => (
            <DrinksDisplay item={item} key={item.idDrink} />
          ))}
        </Tab.Pane>
      ),
    }
    filter_panes.push(item)
  }

  /************************************************* END OF FILTER */

  /********************* SINGLE ITEM ***************************/
  /*** In use when app in SingleState ***/

  useEffect(() => {
    if (element === 3) {
      setLetterDataOnRedux(searchDataState)
    }
  }, [element, searchDataState, setLetterDataOnRedux])

  /************************************************** END OF SINGLE ITEM */

  // RENDER 4 DIFFERENT COMPONENT BASED ON THE "element" STATE
  if (element === 1) {
    return (
      <section className={'---section-wrapper ---relative'}>
        <div
          className={
            width && width >= 1750
              ? '---absolute position-search-bar'
              : '---absolute psb-mobile'
          }
        >
          <SearchExampleStandard />
        </div>
        {width && width >= 1750 ? (
          <>
            <Tab
              panes={panes}
              className={'tab-layout'}
              onTabChange={handleTubChange}
            />
          </>
        ) : (
          <>
            <Tab
              menu={{ fluid: true, vertical: true, tabular: true }}
              panes={panes}
              className={'tab-layout tab-mobile'}
              onTabChange={handleTubChange}
            />
          </>
        )}
      </section>
    )
  } else if (element === 3) {
    return (
      <section className={'---section-wrapper ---relative'} id={'frtger4-item'}>
        <div
          className={
            width && width >= 1750
              ? '---absolute position-search-bar'
              : '---absolute psb-mobile'
          }
        >
          <SearchExampleStandard />
        </div>
        {searchDataState.map((item) => (
          <div className={'single-item-drink'} key={item.idDrink}>
            <DrinksDisplay item={item} />
          </div>
        ))}
      </section>
    )
  } else if (element === 2) {
    return (
      <section className={'---section-wrapper ---relative'}>
        <div
          className={
            width && width >= 1750
              ? '---absolute position-search-bar'
              : '---absolute psb-mobile'
          }
        >
          <SearchExampleStandard />
        </div>
        {width && width >= 1750 ? (
          <>
            <Tab
              panes={filter_panes}
              className={'tab-layout'}
              onTabChange={handleTubChangeFilter}
            />
          </>
        ) : (
          <>
            <Tab
              menu={{ fluid: true, vertical: true, tabular: true }}
              panes={filter_panes}
              className={'tab-layout tab-mobile'}
              onTabChange={handleTubChangeFilter}
            />
          </>
        )}
      </section>
    )
  } else {
    return <div>Error... failed to define app state...</div>
  }
}
