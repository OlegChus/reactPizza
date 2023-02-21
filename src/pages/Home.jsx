import React from 'react';
import qs from 'qs';
import { useNavigate } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux';
import { Pagination } from '../components/Pagination';
import { setCategoryId, setCurrentPage, setFilters } from '../redux/slices/filterSlice';

import { Categories } from '../components/Categories';
import { list, Sort } from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import { Skeleton } from '../components/PizzaBlock/Skeleton';

import axios from 'axios';

export const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isSearch = React.useRef(false);
  const isMounted = React.useRef(false);

  const searchValue = useSelector((state) => state.search.search);
  const { categoryId, currentPage } = useSelector((state) => state.filter);
  const sortType = useSelector((state) => state.filter.sort.sortProperty);

  const [pizzas, setPizzas] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  const onChangeCategory = (id) => {
    dispatch(setCategoryId(id));
  };

  const fetchPizzas = () => {
    setIsLoading(true); //Запуск скелетон
    axios
      .get(
        `${mockapiUrl}page=${currentPage}&limit=8&${category}&sortBy=${sortType}&order=desc${search}`,
      )
      .then((response) => {
        setPizzas(response.data);
        setIsLoading(false);
      });
  };

  const onChangePage = (number) => {
    dispatch(setCurrentPage(number));
  };

  const mockapiUrl = 'https://63c67683d307b769673994a0.mockapi.io/items?';
  const category = categoryId > 0 ? `category=${categoryId}` : ``;
  const search = searchValue ? `&search=${searchValue}` : '';

  // Ели изменили параметры и был первый рендер
  React.useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        sortType,
        categoryId,
        currentPage,
      });
      console.log(queryString);
      navigate(`?${queryString}`);
    }
    isMounted.current = true;
  }, [categoryId, sortType, currentPage, navigate]);

  // Если был первый рендер, то проверяем URL параметры и сохраняем в Redux
  React.useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));
      const sort = list.find((obj) => obj.sortProperty === params.sortType);

      dispatch(
        setFilters({
          ...params,
          sort,
        }),
      );
      isSearch.current = true;
      console.log(params);
    }
  }, []);

  // Если был первый рендер, то запрашиваем пиццы
  React.useEffect(() => {
    window.scrollTo(0, 0); // возврат вверх страницы
    if (!isSearch.current) {
      fetchPizzas();
    }
    isSearch.current = false;
  }, [category, sortType, search, currentPage]);

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
      <Pagination currentPage={currentPage} onChangePage={onChangePage} />
    </div>
  );
};
