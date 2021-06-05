import React, { useEffect, useState } from "react";

import { useLayoutEffect } from "react";

function toInteger(numb) {
  const checkQuantity = numb !== true && Number(numb);
  return !isNaN(checkQuantity) ? parseInt(checkQuantity) : 0;
}

/**
 * @param {Object} props
 * @param {Array} props.pageData Array contendo os dados da página selecionada.
 * @param {Number} props.page O número da página selecionada.
 * @param {Number} props.maxPage O número máximo de páginas.
 */
// eslint-disable-next-line no-unused-vars
function getInfoParam({ pageData, page, maxPage }) {}

/**
 * @param {number} numb Muda de página através de um setInterval, o número passado informa quantas páginas serão passadas por vez.
 * @param {Object} options
 * @param {true} options.autoEvent Padrão true. Cria automaticamente os eventos de detecão de mouseUp, touchend e blur para interromper o interval.
 */
// eslint-disable-next-line no-unused-vars
function setIntervalPageDoc(numb, { autoEvent = true }) {}

/**
 * @param {Object} options
 * @param {number} options.page
 * @param {number} options.maxPage
 * @param {Function} options.setPage
 * @param {Array} options.pageData
 * @param {setIntervalPageDoc} options.setIntervalPage
 */
// eslint-disable-next-line no-unused-vars
function childrenDoc({ page, maxPage, setPage, pageData, setIntervalPage }) {}

/**
 * @param {Object} props
 * @param {Array} props.data Array de dados
 * @param {Number} props.size Padrão 8. Quantidade de dados por página
 * @param {childrenDoc} props.children Padrão 8. Quantidade de dados por página
 * @param {getInfoParam} props.setter Recebe como parâmetro um objeto. Função chamada ao sofrer alteração no data, size ou página.
 */
function Pagination({ data, children, size = 8, setter }) {
  const [maxPage, setMaxPage] = useState(1);
  const [page, setPage] = useState(1);
  const [pageData, setPageData] = useState([]);
  const [interValPage, setIntervalPage] = useState(0);
  const [intervalOptions, setIntervalOptions] = useState(true);
  const [timeUp, setTimeUp] = useState(0);

  useEffect(() => {
    setPage((prev) => (prev > maxPage ? maxPage : prev));
  }, [maxPage]);

  useLayoutEffect(() => {
    if (Array.isArray(data) && data.length > 0) {
      const pageFirstData = page > 1 ? size * (page - 1) : 0;

      const sizeDiffence = data.length - pageFirstData;
      const loopSize = pageFirstData + (sizeDiffence > size ? size : sizeDiffence);

      const thisPageData = [];

      for (let i = pageFirstData; i < loopSize; i++) {
        thisPageData.push(data[i]);
      }

      const newValue = Array.isArray(data) && data.length > 0 ? Math.ceil(data.length / size) : 1;

      setMaxPage((prev) => (newValue !== prev ? newValue : prev));

      setPageData(thisPageData);
    } else {
      setMaxPage(1);

      setPageData((prev) => (Array.isArray(prev) && prev.length === 0 ? prev : []));
    }
  }, [page, data, size]);

  useEffect(() => {
    if (setter) {
      const thisInfos = { pageData, page, maxPage };

      setter(thisInfos);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [maxPage, page, pageData]);

  useEffect(() => {
    const quantity = toInteger(interValPage);

    if (quantity < 0 || quantity > 0) {
      const hold = setInterval(() => {
        if (timeUp === 0) {
          setTimeUp(700);
        } else if (timeUp > 200) {
          setTimeUp(timeUp - 100);
        }
        if (quantity > 0) {
          page < maxPage && setPage(page + 1);
        } else {
          page > 1 && setPage(page - 1);
        }
      }, timeUp);

      if (intervalOptions) {
        const eventFunc = () => {
          setTimeUp(0);
          setIntervalPage(0);

          window.removeEventListener("mouseup", eventFunc);
          window.removeEventListener("touchend", eventFunc);
          window.removeEventListener("blur", eventFunc);
        };

        window.addEventListener("mouseup", eventFunc);
        window.addEventListener("touchend", eventFunc);
        window.addEventListener("blur", eventFunc);
      }

      return () => {
        clearInterval(hold);
      };
    } else if (timeUp !== 0) {
      setTimeUp(0);
    }
  }, [intervalOptions, interValPage, maxPage, page, timeUp]);

  return (
    <>
      {children?.({
        page,
        maxPage,
        setPage,
        pageData,
        setIntervalPage: (numb, options) => {
          const { autoEvent = true } = options || {};
          setIntervalOptions(!!autoEvent);
          setIntervalPage(toInteger(numb));
        },
      })}
    </>
  );
}

export default Pagination;
