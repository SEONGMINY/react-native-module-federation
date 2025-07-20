# React Native Module Federation 정리
## 개요
React Native는 원래 Metro 번들러를 사용했지만, Callstack 팀이 개발한 Re.Pack과 ModuleFederationPlugin을 통해 마이크로프론트엔드 아키텍처를 구현할 수 있게 되었습니다

## Host 앱의 역할과 제약

### Host 앱의 역할
- `AppRegistry.registerComponent`로 엔트리 컴포넌트 등록
- React, React Native, 네이티브 라이브러리를 초기화하고 다른 앱과 공유

### Host 앱의 제약사항
- 다른 앱에서 Host 앱에 접근 불가
- Host 앱은 모듈을 노출할 수 없음
- Host 기능 사용은 공유 라이브러리를 통해서만 가능
- Host는 `index.bundle` 파일로 실행되어 URI로 접근 불가

## Remote(mini) 앱의 역할과 특징

### Remote 앱의 역핳
- 특정 기능을 담당하는 독립적인 모듈

### Remote 앱의 특징
- Host로부터 공유 의존성 받음
- 동적으로 로드됨
- 독립적인 개발/배포 가능

## 관계도
```text
app/
├── 📱 Host/ (메인 앱)
│   ├── index.bundle (앱 스토어 제출용)
│   ├── rspack.config.js
│   ├── package.json
│   └── App.tsx (Mini 앱들을 로드하는 컨테이너)
│
└── 🏠 Home/ (Mini 앱)
    ├── home.bundle.js (서버 배포용)
    ├── rspack.config.js
    ├── package.json
    └── App.tsx (홈 기능 구현)
```

## Eager 설정
- 공식 문서: 모든 앱에서 `eager: true` 필요
- 실제 사용: Host에서만 `eager: true`, 나머지는 `eager: false`로도 동작

### Eager 옵션에 따른 용량 차이
|eager: true|eager: false|
|-----------|------------|
|2.7MB|78KB|
- 앱 하나당 약 2.6MB 추가 트래픽 발생
- 느린 네트워크에서는 약 7초 추가 로딩 시간 발생

## 아키텍처상 이점
- Host가 중앙 집중식으로 의존성 관리
- Mini 앱들은 가벼운 기능 모듈로 유지
- 네트워크 트래픽 최적화
