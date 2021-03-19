const ExampleSelectBoxType = ["gender"];
const ExampleSelectBoxObjPerType = {
    gender: [
        { value: "전체", label: "전체" },
        { value: "M", label: "M" },
        { value: "F", label: "F" }
    ],
    searchType: [
        { value: "전체", label: "전체" },
        { value: "아이디", label: "아이디" },
        { value: "이름", label: "이름" },
        { value: "연락처", label: "연락처" }
    ],
    term: [
        { value: "일간", label: "일간" },
        { value: "월간", label: "월간" }
    ]
};
const ExampleSelectBoxState = { gender: "성별" };

const ExampleFilter = {
    calories: ["cupcake", "cake", "cookie", "macaroon"],
    carbs: ["example1", "example2", "example3", "example4"]
};

const ExampleHeadCell = {
    Example: [
        { id: "name", numeric: false, disablePadding: true, sort: true, filter: false, label: "디저트" },
        { id: "calories", numeric: true, disablePadding: false, sort: false, filter: true, label: "칼로리" },
        { id: "fat", numeric: true, disablePadding: false, sort: false, filter: false, label: "지방" },
        { id: "carbs", numeric: true, disablePadding: false, sort: false, filter: true, label: "탄수화물" },
        { id: "protein", numeric: true, disablePadding: false, sort: false, filter: false, label: "프로틴" },
        { id: "useYn", numeric: false, disablePadding: false, sort: false, filter: false, label: "사용여부" },
        { id: "viewYn", numeric: false, disablePadding: false, sort: false, filter: false, label: "메인노출" },
        { id: "textExample", numeric: false, disablePadding: false, sort: false, filter: false, label: "사용자 입력" },
        { id: "status", numeric: false, disablePadding: false, sort: false, filter: false, label: "관리" }
    ],
    ExampleDetail: [
        { id: "name", numeric: false, disablePadding: true, sort: true, filter: false, label: "디저트" },
        { id: "calories", numeric: true, disablePadding: false, sort: false, filter: true, label: "칼로리" },
        { id: "fat", numeric: true, disablePadding: false, sort: false, filter: false, label: "지방" },
        { id: "carbs", numeric: true, disablePadding: false, sort: false, filter: true, label: "탄수화물" },
        { id: "protein", numeric: true, disablePadding: false, sort: false, filter: false, label: "프로틴" },
        { id: "useYn", numeric: false, disablePadding: false, sort: false, filter: false, label: "사용여부" },
        { id: "viewYn", numeric: false, disablePadding: false, sort: false, filter: false, label: "메인노출" }
    ]
};

const SampleRowData = [
    { key: 1, name: "Cupcake", calories: 1111, fat: 5.5, carbs: 144, protein: 1.2, useYn: "Y", viewYn: "Y", textExample: "사용자 입력" },
    { key: 2, name: "Cupcake", calories: 1111, fat: 5.5, carbs: 144, protein: 1.2, useYn: "Y", viewYn: "Y", textExample: "사용자 입력" },
    { key: 3, name: "Cupcake", calories: 1111, fat: 5.5, carbs: 144, protein: 1.2, useYn: "Y", viewYn: "Y", textExample: "사용자 입력" },
    { key: 4, name: "Cupcake", calories: 1111, fat: 5.5, carbs: 144, protein: 1.2, useYn: "Y", viewYn: "Y", textExample: "사용자 입력" },
    { key: 5, name: "Cupcake", calories: 1111, fat: 5.5, carbs: 144, protein: 1.2, useYn: "Y", viewYn: "Y", textExample: "사용자 입력" },
    { key: 6, name: "Cupcake", calories: 1111, fat: 5.5, carbs: 144, protein: 1.2, useYn: "Y", viewYn: "Y", textExample: "사용자 입력" },
    { key: 7, name: "Cupcake", calories: 1111, fat: 5.5, carbs: 144, protein: 1.2, useYn: "Y", viewYn: "Y", textExample: "사용자 입력" }
];

const SampleDetailData = [
    { key: 1, name: "Cupcake", calories: 305, fat: 3.7, carbs: 67, protein: 4.3, useYn: "사용", viewYn: "활성화" },
    { key: 2, name: "Cupcake", calories: 305, fat: 3.7, carbs: 67, protein: 4.3, useYn: "사용", viewYn: "활성화" },
    { key: 3, name: "Cupcake", calories: 305, fat: 3.7, carbs: 67, protein: 4.3, useYn: "사용", viewYn: "활성화" },
    { key: 4, name: "Cupcake", calories: 305, fat: 3.7, carbs: 67, protein: 4.3, useYn: "사용", viewYn: "활성화" },
    { key: 5, name: "Cupcake", calories: 305, fat: 3.7, carbs: 67, protein: 4.3, useYn: "사용", viewYn: "활성화" },
    { key: 6, name: "Cupcake", calories: 305, fat: 3.7, carbs: 67, protein: 4.3, useYn: "사용", viewYn: "활성화" },
    { key: 7, name: "Cupcake", calories: 305, fat: 3.7, carbs: 67, protein: 4.3, useYn: "사용", viewYn: "활성화" }
];

export { ExampleSelectBoxType, ExampleSelectBoxObjPerType, ExampleSelectBoxState, ExampleFilter, ExampleHeadCell, SampleRowData, SampleDetailData };
