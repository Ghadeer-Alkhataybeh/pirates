// First task requirement
module.exports.catchThePirates = function(arrOfFaces) {
  let arrWithEyes = [];
  let arrWithNoses = [];
  let pirateFaces = [];

  // faces with right pirates eyes
  arrOfFaces.forEach(ele => {
    let face = ele.split("");
    if (face[0] === ";" || face[0] === "8") {
      arrWithEyes.push(ele);
    }
  });

  // faces with right pirates noses
  arrWithEyes.forEach(elem => {
    let face = elem.split("");
    if (face.length === 3) {
      if (face[1] === "-" || face[1] === "~") {
        arrWithNoses.push(elem);
      }
    } else {
      arrWithNoses.push(elem);
    }
  });

  // faces with right pirates faces
  arrWithNoses.forEach(element => {
    let face = element.split("");
    if (face.length == 3) {
      if (face[2] === ")" || face[2] === "|") {
        pirateFaces.push(element);
      }
    } else if (face.length === 2)
      if (face[1] === ")" || face[1] === "|") {
        pirateFaces.push(element);
      }
  });
  return pirateFaces.length;
};
