# Java基础

## java数据类型

### 1.内置数据类型(基本数据类型)

> Java语言提供了八种基本类型。六种数字类型（四个整数型，两个浮点型），一种字符类型，还有一种布尔型。

| 数据类型    | 大小（位） | 最小值                  | 最大值                 | 包装类       | 默认值   | 例子                   |
|---------|-------|----------------------|---------------------|-----------|-------|----------------------|
| byte    | 8     | -128                 | 127                 | Byte      | 0     | `byte a = 100`       |
| short   | 16    | -32768               | 32767               | Short     | 0     | `short s = 1000`     |
| int     | 32    | -2147483648          | 2147483647          | Integer   | 0     | `int a = 100000`     |
| long    | 64    | -9223372036854775808 | 9223372036854775807 | Long      | 0L    | `long a = 100000L`   |
| float   | 32    | --                   | --                  | Float     | 0.0f  | `float f1 = 234.5f`  |
| double  | 64    | --                   | --                  | Double    | 0.0d  | `double d1 = 7D`     |
| boolean | --    | --                   | --                  | Boolean   | false | `boolean one = true` |
| char    | 16    | '\u0000'             | '\uffff'            | Character | --    | `char letter = 'A'`  |

### 2.引用类型

> Class、Array、String、Interface 等都是引用数据类型。 所有引用类型的默认值都是null。

## java修饰符(访问修饰符)

| 修饰符       | 当前类 | 同一包内 | 子孙类（同一包） | 子孙类（不同包） | 其他包 |
|-----------|-----|------|----------|----------|-----|
| public    | Y   | Y    | Y        | Y        | Y   |
| protected | Y   | Y    | Y        | N（说明）    | N   |
| default   | Y   | Y    | Y        | N        | N   |
| private   | Y   | N    | N        | N        | N   |

说明：
- 子类与基类在同一包中：被声明为 protected 的变量、方法和构造器能被同一个包中的任何其他类访问；
- 子类与基类不在同一包中：那么在子类中，子类实例可以访问其从基类继承而来的 protected 方法，而不能访问基类实例的protected方法。

### 默认访问修饰符-不使用任何关键字
> 如果在类、变量、方法或构造函数的定义中没有指定任何访问修饰符，那么它们就默认具有默认访问修饰符。
默认访问修饰符的访问级别是包级别（package-level），即只能被同一包中的其他类访问。
如下例所示，变量和方法的声明可以不使用任何修饰符。

```java
// MyClass.java
 
class MyClass {  // 默认访问修饰符
 
    int x = 10;  // 默认访问修饰符
 
    void display() {  // 默认访问修饰符
        System.out.println("Value of x is: " + x);
    }
}
 
// MyOtherClass.java
 
class MyOtherClass {
    public static void main(String[] args) {
        MyClass obj = new MyClass();
        obj.display();  // 访问 MyClass 中的默认访问修饰符变量和方法
    }
}
```
以上实例中，MyClass 类和它的成员变量 x 和方法 display() 都使用默认访问修饰符进行了定义。MyOtherClass 类在同一包中，因此可以访问 MyClass 类和它的成员变量和方法。

### 私有访问修饰符-private
>私有访问修饰符是最严格的访问级别，所以被声明为 private 的方法、变量和构造方法只能被所属类访问，并且类和接口不能声明为 private。
声明为私有访问类型的变量只能通过类中公共的 getter 方法被外部类访问。
Private 访问修饰符的使用主要用来隐藏类的实现细节和保护类的数据。

下面的类使用了私有访问修饰符：
```java
public class Logger {
   private String format;
   public String getFormat() {
      return this.format;
   }
   public void setFormat(String format) {
      this.format = format;
   }
}
```
实例中，Logger 类中的 format 变量为私有变量，所以其他类不能直接得到和设置该变量的值。为了使其他类能够操作该变量，定义了两个 public 方法：getFormat() （返回 format的值）和 setFormat(String)（设置 format 的值）

### 受保护的访问修饰符-protected
> 在继承关系中，子类可以访问其从父类继承而来的 public 和 protected 成员。当子类与父类不在同一个包中时，子类仍然可以访问从父类继承而来的 protected 成员，但只能通过子类的实例来访问。这意味着，子类的实例可以访问其从父类继承而来的 protected 方法，但不能访问父类实例的 protected 方法。

例如，假设有一个 Animal 类和一个 Cat 类继承自 Animal 类，并且它们位于不同的包中。在 Animal 类中定义了一个 protected 方法 makeSound()，而在 Cat 类中访问该方法：
```java
package animal;

public class Animal {
    protected void makeSound() {
        System.out.println("The animal makes a sound.");
    }
}
```
```java

package cat;

import animal.Animal;

public class Cat extends Animal {
    public void callMakeSound() {
        makeSound(); // 可以访问被继承来的protected方法
        Animal animal = new Animal();
        // 下面这句代码无法编译通过，因为子类实例不能访问基类实例的protected方法
        // animal.makeSound();
    }
}
```
在上面的例子中，Cat 类可以访问从 Animal 类继承而来的 protected 方法 makeSound()，但是它不能访问用 Animal 类的实例调用该方法。

## java修饰符(非访问修饰符)
- static 修饰符，用来修饰类方法和类变量。

- final 修饰符，用来修饰类、方法和变量，final 修饰的类不能够被继承，修饰的方法不能被继承类重新定义，修饰的变量为常量，是不可修改的。

- abstract 修饰符，用来创建抽象类和抽象方法。

- synchronized 和 volatile 修饰符，主要用于线程的编程。
### abstract 修饰符
#### 抽象类：
>抽象类不能用来实例化对象，声明抽象类的唯一目的是为了将来对该类进行扩充。
一个类不能同时被 abstract 和 final 修饰。如果一个类包含抽象方法，那么该类一定要声明为抽象类，否则将出现编译错误。
抽象类可以包含抽象方法和非抽象方法。
```java
abstract class Caravan{
   private double price;
   private String model;
   private String year;
   public abstract void goFast(); //抽象方法
   public abstract void changeColor();
}
```

#### 抽象方法

>抽象方法是一种没有任何实现的方法，该方法的具体实现由子类提供。
抽象方法不能被声明成 final 和 static。
任何继承抽象类的子类必须实现父类的所有抽象方法，除非该子类也是抽象类。
如果一个类包含若干个抽象方法，那么该类必须声明为抽象类。抽象类可以不包含抽象方法。

抽象方法的声明以分号结尾，例如：```public abstract sample();```
```java
public abstract class SuperClass{
    abstract void m(); //抽象方法
}
 
class SubClass extends SuperClass{
     //实现抽象方法
      void m(){
          .........
      }
}
```