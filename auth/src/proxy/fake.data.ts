export function generateFakeData(amount: number, page: number, pageSize: number, meta: string) {
    const data = [];
    const offSet = (page - 1) * pageSize;

    for (let i = offSet; i < (offSet + pageSize); i++) {
        data.push({
            id: `ID${i}`,
            url: `https://google_${i}.com`,
            period: (i + 1) * 100,
            createdAt: '2023.10.17 10:25:17',
            userId: `USER_ID_${i}`,
            acceptanceTime: (i + 2) * 10,
            email: 'robertas.b@gmail.com',
            phone: '+37065048952',
        })
    }

    return {
        count: amount,
        page,
        pageSize,
        data,
        meta: {
            meta,
        }
    };
}