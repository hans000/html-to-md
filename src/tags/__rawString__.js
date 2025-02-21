const {extraEscape}=require('../utils')
const needIndependentLine=require('../utils/needIndependentLine')


class __RawString__{
  constructor(str,tagName='__nomatch__',{
    keepFormat=false,
    prevTagName='',
    nextTagName='',
    parentTag='',
    calcLeading=false,
    layer=1,
    leadingSpace='',
  }={})
  {
    this.tagName=tagName
    this.nextTagName=nextTagName
    this.prevTagName=prevTagName
    this.parentTag=parentTag
    this.keepFormat=keepFormat
    this.calcLeading=calcLeading
    this.leadingSpace=leadingSpace
    this.layer=layer
    this.rawStr=str
  }

  slim(str){
    if(this.keepFormat)return str

    let _str= str.replace(/\s+/g,' ')
    //TODO ?
    // if(needIndependentLine(this.prevTagName) || needIndependentLine(this.nextTagName)){
    //   _str=str.trim()
    // }
    if(this.prevTagName && needIndependentLine(this.prevTagName)){
      _str=_str.trimLeft()
    }
    if(this.nextTagName && needIndependentLine(this.nextTagName)){
      _str=_str.trimRight()
    }
    return _str
  }

  beforeReturn(content){
    if(this.keepFormat)return content
    if(this.calcLeading){
      return this.leadingSpace + extraEscape(content)
    }
    return extraEscape(content)
  }

  exec(){
    let content=this.rawStr
    content=this.slim(content)
    content=this.beforeReturn(content)
    return content
  }
}


module.exports=__RawString__


