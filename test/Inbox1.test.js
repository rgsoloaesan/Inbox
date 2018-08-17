class Dog {
    say(){
        return 'wangwang1';
    }
    happy(){
        return 'miaomiao';
    }
}

//描述测试案例
describe('测试dog',()=>{
    it('测试say', () => {
        const dog = new Dog();
        console.log(dog.say());
    });

});