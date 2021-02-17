/* global kakao */
import React, { useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import './MapContent.scss';

export default function Map({ searchData, resultNum }) {
  // const [searchResult, setSearchResult] = useState(false);

  const mapscript = (searchData2, resultNum2) => {
    // 마커를 담을 배열입니다
    let markers = [];

    const mapContainer = document.getElementById('map'); // 지도를 표시할 div
    const mapOption = {
      center: new kakao.maps.LatLng(37.566826, 126.9786567), // 지도의 중심좌표
      level: 3, // 지도의 확대 레벨
    };

    // 지도를 생성합니다
    const map = new kakao.maps.Map(mapContainer, mapOption);
    // 지도에 마커와 인포윈도우를 표시하는 함수입니다
    // 지도 타입 변경 컨트롤을 생성한다
    const mapTypeControl = new kakao.maps.MapTypeControl();

    // 지도의 상단 우측에 지도 타입 변경 컨트롤을 추가한다
    map.addControl(mapTypeControl, kakao.maps.ControlPosition.TOPRIGHT);

    // 지도에 확대 축소 컨트롤을 생성한다
    const zoomControl = new kakao.maps.ZoomControl();

    // 지도의 우측에 확대 축소 컨트롤을 추가한다
    map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);

    // 장소 검색 객체를 생성합니다
    const ps = new kakao.maps.services.Places();

    // 검색 결과 목록이나 마커를 클릭했을 때 장소명을 표출할 인포윈도우를 생성합니다
    const infowindow = new kakao.maps.InfoWindow({
      zIndex: 1,
      removable: true,
    });

    // 검색결과 항목을 Element로 반환하는 함수입니다
    function getListItem(index, places) {
      const el = document.createElement('li');
      let itemStr =
        `<span class="markerbg marker_${index + 1}"></span>` +
        `<div class="info">` +
        `   <h5>${places.place_name}</h5>`;

      if (places.road_address_name) {
        itemStr +=
          `    <span>${places.road_address_name}</span>` +
          `   <span class="jibun gray">${places.address_name}</span>`;
      } else {
        itemStr += `    <span>${places.address_name}</span>`;
      }

      itemStr += `  <span class="tel">${places.phone}</span>`;
      itemStr += `</div>`;

      el.innerHTML = itemStr;
      el.className = 'item';

      return el;
    }

    // 마커를 생성하고 지도 위에 마커를 표시하는 함수입니다
    function addMarker(position, idx, title) {
      const imageSrc =
        'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_number_blue.png'; // 마커 이미지 url, 스프라이트 이미지를 씁니다
      const imageSize = new kakao.maps.Size(36, 37); // 마커 이미지의 크기
      const imgOptions = {
        spriteSize: new kakao.maps.Size(36, 691), // 스프라이트 이미지의 크기
        spriteOrigin: new kakao.maps.Point(0, idx * 46 + 10), // 스프라이트 이미지 중 사용할 영역의 좌상단 좌표
        offset: new kakao.maps.Point(13, 37), // 마커 좌표에 일치시킬 이미지 내에서의 좌표
      };
      const markerImage = new kakao.maps.MarkerImage(
        imageSrc,
        imageSize,
        imgOptions,
      );
      const marker = new kakao.maps.Marker({
        position, // 마커의 위치
        image: markerImage,
      });

      marker.setMap(map); // 지도 위에 마커를 표출합니다
      markers.push(marker); // 배열에 생성된 마커를 추가합니다

      return marker;
    }

    // 지도 위에 표시되고 있는 마커를 모두 제거합니다
    function removeMarker() {
      for (let i = 0; i < markers.length; i++) {
        markers[i].setMap(null);
      }
      markers = [];
    }

    // 검색결과 목록 하단에 페이지번호를 표시는 함수입니다
    function displayPagination(pagination) {
      const paginationEl = document.getElementById('pagination');
      const fragment = document.createDocumentFragment();
      let i;

      // 기존에 추가된 페이지번호를 삭제합니다
      while (paginationEl.hasChildNodes()) {
        paginationEl.removeChild(paginationEl.lastChild);
      }

      for (i = 1; i <= pagination.last; i++) {
        const el = document.createElement('a');
        el.href = '#';
        el.innerHTML = i;

        if (i === pagination.current) {
          el.className = 'on';
        } else {
          el.onclick = (function (i) {
            return function () {
              pagination.gotoPage(i);
            };
          })(i);
        }

        fragment.appendChild(el);
      }
      paginationEl.appendChild(fragment);
    }
    function closeOverlay() {
      infowindow.close();
    }
    // 검색결과 목록 또는 마커를 클릭했을 때 호출되는 함수입니다
    // 인포윈도우에 장소명을 표시합니다
    function displayInfowindow(marker, place) {
      const content =
        '<div class="marker__wrap">' +
        '    <div class="marker__info">' +
        '        <div class="marker__title">' +
        `           <a href="${place.place_url}" target="_blank">${place.place_name}</a>` +
        '        </div>' +
        '        <hr />' +
        '        <div class="marker__body">' +
        '            <div class="marker__desc">' +
        `                <div class="ellipsis">${place.road_address_name}</div>` +
        `                <div class="phone">${place.phone}</div>` +
        '            </div>' +
        '        </div>' +
        '    </div>' +
        '</div>';

      infowindow.setContent(content);
      infowindow.open(map, marker);
    }

    // 검색결과 목록의 자식 Element를 제거하는 함수입니다
    function removeAllChildNods(el) {
      while (el.hasChildNodes()) {
        el.removeChild(el.lastChild);
      }
    }

    // 검색 결과 목록과 마커를 표출하는 함수입니다
    function displayPlaces(places) {
      const listEl = document.getElementById('placesList');
      const menuEl = document.getElementById('menu_wrap');
      const fragment = document.createDocumentFragment();
      const bounds = new kakao.maps.LatLngBounds();
      const listStr = '';

      // 검색 결과 목록에 추가된 항목들을 제거합니다
      removeAllChildNods(listEl);

      // 지도에 표시되고 있는 마커를 제거합니다
      removeMarker();

      for (let i = 0; i < places.length; i++) {
        // 마커를 생성하고 지도에 표시합니다
        const placePosition = new kakao.maps.LatLng(places[i].y, places[i].x);
        const marker = addMarker(placePosition, i);
        const itemEl = getListItem(i, places[i]); // 검색 결과 항목 Element를 생성합니다
        // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
        // LatLngBounds 객체에 좌표를 추가합니다
        bounds.extend(placePosition);

        // 마커와 검색결과 항목에 mouseover 했을때
        // 해당 장소에 인포윈도우에 장소명을 표시합니다
        // mouseout 했을 때는 인포윈도우를 닫습니다
        (function (marker2, title) {
          kakao.maps.event.addListener(marker2, 'click', () => {
            displayInfowindow(marker2, title);
          });

          // kakao.maps.event.addListener(marker2, 'mouseout', () => {
          //   infowindow.close();
          // });

          itemEl.onclick = function () {
            displayInfowindow(marker2, title);
          };

          itemEl.onmouseout = function () {
            infowindow.close();
          };
        })(marker, places[i]);

        fragment.appendChild(itemEl);
      }

      // 검색결과 항목들을 검색결과 목록 Elemnet에 추가합니다
      listEl.appendChild(fragment);
      menuEl.scrollTop = 0;

      // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
      map.setBounds(bounds);
    }

    // 장소검색이 완료됐을 때 호출되는 콜백함수 입니다
    function placesSearchCB(data, status, pagination) {
      if (status === kakao.maps.services.Status.OK) {
        // 정상적으로 검색이 완료됐으면
        // 검색 목록과 마커를 표출합니다
        displayPlaces(data);

        // 페이지 번호를 표출합니다s
        displayPagination(pagination);
      } else if (status === kakao.maps.services.Status.ZERO_RESULT) {
        toast.error('검색 결과가 존재하지 않습니다.');
      } else if (status === kakao.maps.services.Status.ERROR) {
        toast.error('검색 결과 중 오류가 발생했습니다.');
      }
    }

    // 키워드 검색을 요청하는 함수입니다
    function searchPlaces() {
      const keyword = `${searchData2} 동물병원`;
      const searchoptions = {
        size: resultNum2,
      };
      if (!keyword.replace(/^\s+|\s+$/g, '')) {
        toast.error('키워드를 입력해주세요!');
        return false;
      }
      // 장소검색 객체를 통해 키워드로 장소검색을 요청합니다
      return ps.keywordSearch(keyword, placesSearchCB, searchoptions);
    }

    // 키워드로 장소를 검색합니다
    searchPlaces();
  };

  useEffect(() => {
    mapscript(searchData, resultNum);
  }, [searchData, resultNum]);

  return (
    <>
      <Toaster />
      <div className="map_wrap">
        <div
          id="map"
          style={{
            width: '100%',
            height: '100%',
            borderRadius: '20px',
            boxShadow: '3px 3px 6px 4px rgba(0, 0, 0, 0.199)',
          }}
        ></div>

        <div id="menu_wrap" className="bg_white">
          <ul id="placesList"></ul>
          <div id="pagination"></div>
        </div>
      </div>
    </>
  );
}
