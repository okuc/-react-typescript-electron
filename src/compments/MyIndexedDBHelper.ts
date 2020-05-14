
class MyIndexedDBHelper{
   
    dbConn!: IDBDatabase; //数据库连接

    DB = window.indexedDB;//减少编码，赋值给一个变量
    dbname:string = 'TestDB';//数据库名
    dbversion:number = 1//版本
    dbTableName:string = 'Test';

    constructor(dbname:string = 'TestDB',dbversion:number = 1,dbTableName:string = 'Test'){
        this.dbname=dbname;
        this.dbversion=dbversion;
        this.dbTableName = dbTableName
        if (!window.indexedDB) {
            alert('浏览器不支持indexedDB')
        }
    }
 
    openDB(){

        //创建一个indexedDB数据库,localStorage不能存储过多的东西LocalStore只支持10M，但是indexedDB无上限，随意存储
       // 定义数据库连接和数据格式，创建client
        var request = this.DB.open(this.dbname, this.dbversion);

        request.onsuccess = ()=> {
           // 获取数据对象
           this.dbConn = request.result;
            console.log('Successful request for IndexedDB.');
        }

        request.onerror = ()=> {
            console.log("connect indexedDB err:",request.error);
        };

        //数据版本,onupgradeneeded事件在第一次打开页面初始化数据库时会被调用，或在当有版本号变化时。
        //所以，你应该在onupgradeneeded函数里创建你的存储数据。如果没有版本号变化，而且页面之前被打开过，你会获得一个onsuccess事件。
        request.onupgradeneeded = (e:Event)=> {
          this.dbConn= request.result;//获取数据库连接
            if (!this.dbConn.objectStoreNames.contains(this.dbTableName)) {
                console.log("我需要创建一个新的存储对象");
                //如果表格不存在，创建一个新的表格（keyPath，主键 ； autoIncrement,是否自增），会返回一个对象（objectStore）
                var objectStore = this.dbConn.createObjectStore(this.dbTableName, {
                    //  keyPath: "id", //设置主键 设置了内联主键就不可以使用put的第二个参数(这里是个坑)
                    autoIncrement: true
                });
    
                //指定可以被索引的字段，unique字段是否唯一
                objectStore.createIndex("name_idx", "name", {
                    unique: false
                });
    
                //使用object store的createIndex创建索引，方法有三个参数：索引名称、索引属性字段名、索引属性值是否唯一。
                objectStore.createIndex("time_idx", "time", {
                    unique: false
                });                
                
    
            }
            console.log('数据库版本更改为： ' + this.dbversion);
       };
    } 

    putData(msg:any){

        //首先需要创建一个事务，并要求具有读写权限
        var transaction = this.dbConn.transaction(this.dbTableName, 'readwrite');
        //获取objectStore，再调用add方法添加数据
        var store = transaction.objectStore(this.dbTableName);
       // store.put(msg);
        store.add(msg);
       
          transaction.onerror = ()=> {
            console.log('数据写入失败:');
           
          }
          transaction.oncomplete = () => {
           
          };

    }

    //第二处参数不输入，则查询所有数据
    readData(callbackFun:any,key?:number){

        let addResult:string = 'no result';
            //首先需要创建一个事务，并要求具有读写权限
            var transaction = this.dbConn.transaction(this.dbTableName);
            //获取objectStore，再调用add方法添加数据
            var store = transaction.objectStore(this.dbTableName);
            //let index = store.index('name_idx');//用指定的索引进行查询
            //index.get(1);
           var request:IDBRequest;
            if (key)
                request = store.get(key);
             else
                 request = store.getAll();
           
            request.onerror = ()=> {
              console.log('事务失败');
             
            };
         
            request.onsuccess = ()=> {
              console.log(request.result);
               if (request.result) {
                callbackFun(request.result);
               } 
              
            };

            console.log(addResult);
       
    }

    getCursor(callbackFun:any):void{

            //首先需要创建一个事务，并要求具有读写权限
            var transaction = this.dbConn.transaction(this.dbTableName);
            //获取objectStore，再调用add方法添加数据
            var store = transaction.objectStore(this.dbTableName);
            let index = store.index('name_idx');
            let request = index.openCursor(); //IDBKeyRange.only("Fred")
            let results: Array<any> = [];
    
            request.onsuccess =()=>{
                let cursor = request.result;
                if (cursor) {
                  results.push(cursor.value);
                  cursor.continue();//遍历了存储对象中的所有内容
                } else {
                 
                }
                
                callbackFun(results);
              };

    }
    

    updateData(msg:any,key:number) {


        //首先需要创建一个事务，并要求具有读写权限
        var transaction = this.dbConn.transaction(this.dbTableName, 'readwrite');
        //获取objectStore，再调用add方法添加数据
        var store = transaction.objectStore(this.dbTableName);
     let request = store.put(msg,key);//自动更新主键为1 的记录,存在则更新
      
        request.onsuccess = ()=>{
          console.log('数据更新成功');
          
         
        };
      
        request.onerror = ()=>{
          console.log('数据更新失败');
          
         
        }
      }


    remove( id: number):boolean{

        //首先需要创建一个事务，并要求具有读写权限
        var transaction = this.dbConn.transaction(this.dbTableName,'readwrite');
        //获取objectStore，再调用add方法添加数据
        var store = transaction.objectStore(this.dbTableName);

        store.delete(id);

        transaction.oncomplete = (e: any) => {
           
            return true;
        };
        this.dbConn.onerror = (e: any) => {
           
            return false;
        };
        return true;
    }

    count():number{

        //首先需要创建一个事务，并要求具有读写权限
        var transaction = this.dbConn.transaction(this.dbTableName);
        //获取objectStore，再调用add方法添加数据
        var store = transaction.objectStore(this.dbTableName);
        let index = store.index('name_idx');

        let request = index.count();
        let num:number=0;
        request.onsuccess = () => {
            num= request.result;
           
        };
        this.dbConn.onerror = (e: any) => {
           
        };
        return num;
   
    }

    closeDB=()=> {

      this.dbConn.close();
  
  }
    deleteDB() {

      indexedDB.deleteDatabase(this.dbname);
  
  }    
}
export default MyIndexedDBHelper;