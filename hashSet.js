function hash(key) {
    let hashCode = 0;
       
    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = 13 * primeNumber * hashCode + key.charCodeAt(i);
    }
 
    return hashCode;
  } 

class HashSet {
    table = new Array(8)
    loadFactor = 0.75;
    set(key) {
        let idx = hash(key) % this.table.length;
        if (this.table[idx] == undefined) {
        this.table[idx] = {key: key};
        } else {
          this.table[idx].next = {key: key};
        }
        if (this.length()/this.table.length > this.loadFactor) {
          let oldBuckets = this.table;
          this.table = new Array(oldBuckets.length * 2);
          oldBuckets.forEach(element => {
            if (element.next != undefined) {
              this.set(element.next.key)
            } else {
              this.set(element.key)
            }
          });
          console.log('Bucket expansion')
        }
    }

    get(key) {
      let idx = hash(key) % this.table.length;
      if (this.table[idx] != undefined && key == this.table[idx].key){
        return this.table[idx].value
      } else {
        return null
      }
    }

    has(key) {
      let keyArr = []
      this.table.forEach(element => {
        keyArr.push(element.key)
      });
      return keyArr.includes(key)
    }

    remove(key) {
      if (this.has(key) == true) {
        let idx = hash(key) % this.table.length;
        this.table[idx] = '';
        return true;
      } else {
        return false
      }
    }

    length() {
      let i = 0
      this.table.forEach(element => {
        if (element != undefined) {
          i++
        }
      })
      return i;
    }

    clear() {
      this.table.length = 0;
      this.table.length = 16;
      console.log(this.table)
    }

    keys() {
      let keyArr = []
      this.table.forEach(element => {
        keyArr.push(element.key)
      });
      return keyArr
    }

}

let set = new HashSet()
set.set('Alfredo', 'Capo de la viola');
set.set('Conix', 'Voces gloriosas')
set.set('Maz', 'Bajismo y produccion')
set.set('Colo', 'Lo que batea papa')
set.set('Chacal', 'Chapero viejo si los hay')
console.log(set.table);