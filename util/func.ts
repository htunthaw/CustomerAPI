export namespace Func {

    export function getEnumKeyByEnumValue<T extends {[index:string]:string}>(myEnum:T, enumValue:string):keyof T {
        let keys = Object.keys(myEnum).filter(x => myEnum[x] == enumValue);
        return  keys[0];
    }
    
    }