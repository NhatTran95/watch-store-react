export function priceAfterDiscount(price, discountPercentage){
    return Math.round(price * (1 - Number(discountPercentage) * 0.01))
}

export const priceList = [
    { "value": "0,2", "name": "Dưới 2tr" },
    { "value": "2,3", "name": "Từ 2tr đến 3tr" },
    { "value": "3,4", "name": "Từ 3tr đến 4tr" },
    { "value": "4,5", "name": "Từ 4tr đến 5tr" },
    { "value": "5,5", "name": "Trên 5tr" },
]

export const genderList = [
    {'value': "MEN", 'name': "NAM" },
    {'value': "WOMEN", 'name': "NỮ" },
    {'value': "COUPLE", 'name': "CẶP ĐÔI" }
]

