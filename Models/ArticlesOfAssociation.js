const mongoose = require('mongoose');

const ArticlesOfAssociationSchema = new mongoose.Schema({

}, { collection: 'articles_of_association', strict: false });
// ArticlesOfAssociationSchema.index({ 'name': 'text'});


const ArticlesOfAssociation = mongoose.model('ArticlesOfAssociation', ArticlesOfAssociationSchema);

module.exports = ArticlesOfAssociation;
