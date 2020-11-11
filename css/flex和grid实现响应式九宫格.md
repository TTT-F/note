## 响应式九宫格布局

### flex

```css
 .wrap {
            width: 100%;
            height: 0;
            position: relative;
            padding-bottom: 100%;
        }
        
        .inner {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            display: flex;
            flex-wrap: wrap;
            flex-direction: row;
            justify-content: space-between;
        }
        
        li {
            width: calc(90% / 3);
            height: calc(90% / 3);
            background-color: blue;
        }
```

```html
 <div class="wrap">
        <div class="inner">
            <li>1</li>
            <li>2</li>
            <li>3</li>
            <li>4</li>
            <li>5</li>
            <li>6</li>
            <li>7</li>
            <li>8</li>
            <li>9</li>
        </div>
    </div>
```

### grid

```css
 .wrap {
            width: 100%;
            height: 0;
            position: relative;
            padding-bottom: 100%;
        }
        
        .inner {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
           
            display: grid;
            grid-template-columns: 1fr 1fr 1fr;
            grid-template-rows: repeat(3, 1fr);
            grid-gap: 2%;
            
        }
        
        li {
           
            background-color: blue;
        }
```

