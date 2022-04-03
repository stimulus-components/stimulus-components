## 🧪 Quick example

Here is an example of how use <NuxtLink to="/docs/stimulus-content-loader">Stimulus Content Loader</NuxtLink>.

### 1. Install the package:

```bash
$ yarn add stimulus-content-loader
```

### 2. Import it in your application:

```js
import { Application } from '@hotwired/stimulus'
import ContentLoader from 'stimulus-content-loader'

const application = Application.start()
application.register('content-loader', ContentLoader)
```

### 3. Use it in your views

```erb
<div
  data-controller="content-loader"
  data-content-loader-url-value="/comments"
>
  <i class="fas fa-spinner fa-spin"></i>
  Loading comments... This content will be replaced by the content returned by the url /comments.
</div>
```

### 4. Enjoy it! 🎉

It is as easy as that.
