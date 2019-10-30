// 1.載入並使用專案框架、套件及檔案，設定連接埠
const express = require('express')
const app = express()
const port = 3000
const exphbs = require('express-handlebars')
const restaurantList = require('./restaurant.json')

// 2.樣版引擎設定，設定main.handlebars為佈局
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

// 3.設定靜態檔案根目錄
app.use(express.static('public'))

// 4.路由設定
// 4-1.首頁渲染index.handlebars
app.get('/', (req, res) => {
  res.render('index', { restaurants: restaurantList.results })
})

// 4-2.動態路由設定，比對點選項目id後，detail頁面渲染show.handlebars
app.get('/restaurants/:restaurant_id', (req, res) => {
  const restaurant = restaurantList.results.find(item => item.id.toString() === req.params.restaurant_id)
  res.render('show', { restaurant: restaurant })
})

// 4-3.取得輸入字串，比對篩選項目名稱是否包含關鍵字，並把關鍵字傳進index.handlebars後渲染頁面
app.get('/search', (req, res) => {
  const keyword = req.query.keyword
  const matchedRestaurants = restaurantList.results.filter(item => {
    return item.name.toLowerCase().includes(keyword.toLowerCase())
  })
  res.render('index', { restaurants: matchedRestaurants, keyword: keyword })
})

// 5.啟動並監聽伺服器
app.listen(port, () => {
  console.log(`port ${port} is on`)
})