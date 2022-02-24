const toTitles = (s)=> {
    return s.replace(/\w\S*/g, function(t) {
        return t.charAt(0).toUpperCase() + t.substr(1).toLowerCase();
    });
}


const toShort = (desc) => {
    if (desc.length >= 50)
      return desc.substring(0, 50) + '...';
    else
      return desc.substring(0, 50)
  }



const Helper = {
    toTitles,
    toShort

}

export default Helper