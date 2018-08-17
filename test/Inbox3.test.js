const assert = require("assert");
class Dog {
    say(){
        return 'wangwang3';
    }
    happy(){
        return 'miaomiao';
    }
}

let dog ;
beforeEach(() => {
    dog = new Dog();
});
//描述测试案例
describe('测试dog',()=>{
    it('测试say', () => {
        console.log("测试3");
        //如果dog.say()和“wangwang”相等，就测试通过
        assert.equal(dog.say(), "wangwang3");
    });

});