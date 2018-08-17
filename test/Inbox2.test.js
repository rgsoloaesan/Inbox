const assert = require("assert");
class Dog {
    say(){
        return 'wangwang2';
    }
    happy(){
        return 'miaomiao';
    }
}


//描述测试案例
describe('测试dog',()=>{
    it('测试say', () => {
        const dog = new Dog();
        console.log("测试2");
        //如果dog.say()和“wangwang”相等，就测试通过
        assert.equal(dog.say(), "wangwang2");
    });

});