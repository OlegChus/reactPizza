import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Pagination } from '../components/Pagination';
import { setCategoryId } from '../redux/slices/filterSlice';

import { Categories } from '../components/Categories';
import { Sort } from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import { Skeleton } from '../components/PizzaBlock/Skeleton';

import axios from 'axios';

export const Home = () => {
  const searchValue = useSelector((state) => state.search.search);
  const dispatch = useDispatch();
  const categoryId = useSelector((state) => state.filter.categoryId);
  const sortType = useSelector((state) => state.filter.sort.sortProperty);

  const onChangeCategory = (id) => {
    dispatch(setCategoryId(id));
  };

  const [pizzas, setPizzas] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [currentPage, setCurrentPage] = React.useState(1);

  const mockapiUrl = 'https://63c67683d307b769673994a0.mockapi.io/items?';
  const category = categoryId > 0 ? `category=${categoryId}` : '';
  const search = searchValue ? `&search=${searchValue}` : '';

  React.useEffect(() => {
    setIsLoading(true); //Запуск скелетон

    // fetch(
    //   `${mockapiUrl}page=${currentPage}&limit=8&${category}&sortBy=${sortType.sortProperty}&order=desc${search}`,
    // )
    //   .then((res) => res.json())
    //   .then((json) => {
    //     // console.log(json);
    //     setPizzas(json);
    //     setIsLoading(false); //Выключение скелетон
    //   });

    axios
      .get(
        `${mockapiUrl}page=${currentPage}&limit=8&${category}&sortBy=${sortType.sortProperty}&order=desc${search}`,
      )
      .then((response) => {
        setPizzas(response.data);
        setIsLoading(false);
      });

    window.scrollTo(0, 0); // возврат вверх страницы
  }, [category, sortType, search, currentPage]);

  // console.log(searchValue);
  const allPizzaz = pizzas

    //*************** Фильтрация статических данных *******************/
    // .filter((obj) => {
    //   if (obj.name.toLowerCase().includes(searchValue.toLowerCase())) {
    //     return true;
    //   }
    //   return false;
    // })

    .map((obj) => <PizzaBlock key={obj.id} {...obj} />);

  const sceleton = [...new Array(10)].map((_, index) => <Skeleton key={index} />);

  return (
    <div className="container">
      <div className="content__top">
        <Categories value={categoryId} onClickCat={onChangeCategory} />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">{isLoading ? sceleton : allPizzaz}</div>
      <Pagination onChangePage={(number) => setCurrentPage(number)} />
    </div>
  );
};
