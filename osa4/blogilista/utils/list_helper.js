const _ = require('lodash')

const dummy = (blogs) => {
  console.log(blogs)
  return 1
}


const totalLikes = (blogs) => {
  if (blogs.length === 0) {
    return 0
  }

  var total = 0
  for (var i = 0; i < blogs.length; i++) {
    total += blogs[i].likes
  }
  return total
}

const favoriteBlog = (blogs) => {

  if (blogs.length === 0) {
    return 0
  }
  var favorite = blogs.reduce((prev, curr) => (prev.likes > curr.likes) ? prev : curr)
  return {
    title: favorite.title,
    author: favorite.author,
    likes: favorite.likes
  }
}

const mostBlogs = (blogs) => {

  if (blogs.length === 0) {
    return 0
  }
  var authors = []

  blogs.forEach(blog => {
    if (!authors.find(x => x.author === blog.author)) {
      authors.push({author: blog.author,
        blogs: 1})
      
    } else {
      var authIndex = _.findIndex(authors, function(o) { return o.author == blog.author })
      authors[authIndex].blogs += 1
    }
  })

  var most = authors.reduce((prev, curr) => (prev.blogs > curr.blogs) ? prev : curr)
  return most
}




module.exports = {
  dummy, totalLikes, favoriteBlog, mostBlogs
}