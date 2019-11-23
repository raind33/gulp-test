const { src, dest, watch, series } = require('gulp')

const del = require('del')
const plugins = require('gulp-load-plugins')()
const browserSync = require('browser-sync').create()
const reload = browserSync.reload

// 压缩js
function js(cb) {
  src('js/*.js')
    .pipe(plugins.uglify())
    .pipe(dest('./dist/js'))
    .pipe(
      reload({
        stream: true
      })
    )
  console.log('生成js')
  cb()
}

// 对scss/less编译、压缩、输出css
function css(cb) {
  src('css/*.scss')
    .pipe(
      plugins.sass({
        outputStyle: 'compressed'
      })
    )
    .pipe(
      plugins.autoprefixer({
        cascade: false,
        remove: false
      })
    )
    .pipe(dest('./dist/css'))
    .pipe(
      reload({
        stream: true
      })
    )
  cb()
}

// 监听文件变化
function watcher(cb) {
  watch('css/*.scss', css)
  watch('js/*.js', js)
}

// 删除dist目录
function clean(cb) {
  del('./dist')
  console.log('del')
  cb()
}

// server任务
function serve(cb) {
  browserSync.init({
    server: {
      baseDir: './'
    }
  })
  cb()
}

exports.scripts = js
exports.clean = clean
exports.styles = css
exports.default = series([js, css, serve, watcher])
