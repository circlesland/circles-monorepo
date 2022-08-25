import computeSum from "./testUtils";

describe('Test compute sum', () => {
    it('should add 2 numbers', () => {
        const result = computeSum(1, 2);
        
        expect(result).toBe(3);
    })
});