import Post from '../models/Post.js';
import PostModel from '../models/Post.js';

export const getAll = async (req, res) => {
  try {
    const posts = await PostModel.find().populate('user').exec();
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: 'Не удалось найти статьи' });
  }
};

export const getOnePost = async (req, res) => {
  try {
    const postId = req.params.id;
    PostModel.findOneAndUpdate(
      { _id: postId },
      { $inc: { viewsCount: 1 } },
      { returnDocument: 'after' },
      (err, doc) => {
        if (err) {
          console.log(err);
          return res.status(500).json({
            message: 'Не удалось вернусть статью!',
          });
        }
        if (!doc) {
          return res.status(404).json({ message: 'Статья не найдена!' });
        }
        res.json(doc);
      }
    );
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Не удалось найти статью' });
  }
};

export const create = async (req, res) => {
  try {
    const doc = new PostModel({
      title: req.body.title,
      description: req.body.description,
      imgUrl: req.body.imgUrl,
      user: req.userId,
    });
    const post = await doc.save();
    res.json(post);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Не удалось создать пост' });
  }
};

export const removePost = async (req, res) => {
  try {
    const postId = req.params.id;
    PostModel.findByIdAndDelete({ _id: postId }, (err, doc) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          message: 'Не удалось удалить статью!',
        });
      }
      if (!doc) {
        return res.status(404).json({ message: 'Статья не найдена!' });
      }
      return res.json({ success: true });
    }).populate('user');
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Не удалось удалить статью!' });
  }
};

export const updatePost = async (req, res) => {
  try {
    const postId = req.params.id;
    await PostModel.updateOne(
      { _id: postId },
      {
        title: req.body.title,
        description: req.body.description,
        imgUrl: req.body.imgUrl,
      }
    );
    return res.json({
      success: true,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Не удалось обновить статью!' });
  }
};
