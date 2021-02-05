/* global kakao */
import React, { useState, useEffect } from 'react';
import './MapContent.scss';

export default function Map(props) {
  const [searchResult, setSearchResult] = useState(false);

  const mapscript = (search) => {
    const infowindow = new kakao.maps.InfoWindow({ zIndex: 1 });
    const mapContainer = document.getElementById('map'); // 지도를 표시할 div
    const mapOption = {
      center: new kakao.maps.LatLng(33.450701, 126.570667), // 지도의 중심좌표
      level: 7, // 지도의 확대 레벨
    };

    const map = new kakao.maps.Map(mapContainer, mapOption); // 지도를 생성합니다
    // 지도에 마커와 인포윈도우를 표시하는 함수입니다
    // 지도 타입 변경 컨트롤을 생성한다
    const mapTypeControl = new kakao.maps.MapTypeControl();

    // 지도의 상단 우측에 지도 타입 변경 컨트롤을 추가한다
    map.addControl(mapTypeControl, kakao.maps.ControlPosition.TOPRIGHT);

    // 지도에 확대 축소 컨트롤을 생성한다
    const zoomControl = new kakao.maps.ZoomControl();

    // 지도의 우측에 확대 축소 컨트롤을 추가한다
    map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);

    // 지도 중심 좌표 변화 이벤트를 등록한다
    kakao.maps.event.addListener(map, 'center_changed', () => {
      console.log(`지도의 중심 좌표는 ${map.getCenter().toString()} 입니다.`);
    });

    // 지도 확대 레벨 변화 이벤트를 등록한다
    kakao.maps.event.addListener(map, 'zoom_changed', () => {
      console.log(`지도의 현재 확대레벨은 ${map.getLevel()}레벨 입니다.`);
    });

    // 지도 영역 변화 이벤트를 등록한다
    kakao.maps.event.addListener(map, 'bounds_changed', () => {
      const mapBounds = map.getBounds();
      const message = `지도의 남서쪽, 북동쪽 영역좌표는 ${mapBounds.toString()}입니다.`;

      console.log(message);
    });

    // 지도 클릭 이벤트를 등록한다 (좌클릭 : click, 우클릭 : rightclick, 더블클릭 : dblclick)
    kakao.maps.event.addListener(map, 'click', (mouseEvent) => {
      console.log(
        `지도에서 클릭한 위치의 좌표는 ${mouseEvent.latLng.toString()} 입니다.`,
      );
    });

    // 지도 드래깅 이벤트를 등록한다 (드래그 시작 : dragstart, 드래그 종료 : dragend)
    kakao.maps.event.addListener(map, 'drag', () => {
      const message = `지도를 드래그 하고 있습니다.  + '지도의 중심 좌표는 '
      ${map.getCenter().toString()} 입니다.`;
      console.log(message);
    });
    // 마커 이미지의 주소
    const markerImageUrl =
      'https://i.ibb.co/KmLHFHZ/red-flat-pets-gps-logo-design-paw-map-marker-vector-animal-walking-takes-care-location-position-navi.png';
    const markerImageSize = new kakao.maps.Size(50, 56); // 마커 이미지의 크기
    const markerImageOptions = {
      offset: new kakao.maps.Point(23, 33), // 마커 좌표에 일치시킬 이미지 안의 좌표
    };

    // 마커 이미지를 생성한다
    const markerImage = new kakao.maps.MarkerImage(
      markerImageUrl,
      markerImageSize,
      markerImageOptions,
    );
    // 장소 검색 객체를 생성합니다
    const ps = new kakao.maps.services.Places();
    // 지도에 마커를 표시하는 함수입니다
    function displayMarker(place) {
      // 마커를 생성하고 지도에 표시합니다
      const marker = new kakao.maps.Marker({
        map,
        image: markerImage,
        position: new kakao.maps.LatLng(place.y, place.x),
      });

      const content =
        '<div className="marker__wrap">' +
        '    <div className="marker__info">' +
        '        <div className="marker__title">' +
        `           <a href="${place.place_url}" target="_blank">${place.place_name}</a>` +
        '            <div className="marker__close" onclick="closeOverlay()" title="닫기"></div>' +
        '        </div>' +
        '        <hr>' +
        '        <div className="marker__body">' +
        '            <div className="marker__desc">' +
        `                <div className="ellipsis">${place.road_address_name}</div>` +
        `                <div className="phone">${place.phone}</div>` +
        '            </div>' +
        '        </div>' +
        '    </div>' +
        '</div>';
      // 마커에 클릭이벤트를 등록합니다
      kakao.maps.event.addListener(marker, 'click', () => {
        // 마커를 클릭하면 장소명이 인포윈도우에 표출됩니다
        infowindow.setContent(content);
        infowindow.open(map, marker);
      });
    }
    // 키워드 검색 완료 시 호출되는 콜백함수 입니다
    function placesSearchCB(data, status, pagination) {
      if (status === kakao.maps.services.Status.OK) {
        setSearchResult(false);
        // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
        // LatLngBounds 객체에 좌표를 추가합니다
        const bounds = new kakao.maps.LatLngBounds();
        for (let i = 0; i < data.length; i++) {
          // console.log(data[i]);
          // const li = document.createElement('li');
          // li.innerHTML = `${data[i].place_name}`;
          // const ul = document.getElementById('resulthospital');
          // ul.appendChild(li);
          displayMarker(data[i]);
          bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
        }
        console.log(map);
        // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
        map.setBounds(bounds);
      } else if (status === kakao.maps.services.Status.ZERO_RESULT) {
        setSearchResult(true);
      } else if (status === kakao.maps.services.Status.ERROR) {
        setSearchResult(true);
      }
    }
    // 키워드로 장소를 검색합니다
    ps.keywordSearch(`${search}+동물병원`, placesSearchCB);
  };
  // const temp = hospitals.map((hospital) => <li>{hospital}</li>);
  useEffect(() => {
    mapscript(props.searchData);
  }, [props.searchData]);

  return (
    <>
      <div className={searchResult ? 'nonactive' : 'active'}>
        검색결과가 없습니다
      </div>
      <div
        id="map"
        style={{
          display: 'flex',
          top: '20px',
          border: 'none',
          borderRadius: '25px',
          width: '100%',
          height: '70vh',
        }}
      ></div>
      <ul id="resulthospital"></ul>
    </>
  );
}
