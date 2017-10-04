

export default (req, res) => {
  if (!req.files) {
    res.status(404).json({ message: 'No file was uploaded' });
  }
  const formname = req.files.fileuplaod;
  formname.mv(`../../images/${formname.name}`, (err) => {
    if (err) {
      res.status(500).json(err);
    }
    res.status(200).json({ message: 'File Update successful', name: req.files.formname.name });
  });
};
