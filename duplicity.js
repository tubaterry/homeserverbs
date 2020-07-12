// From the raw editor, inspect a multitree-item-rooot
// tempSaveGame=temp0.__reactEventHandlers$awy27jcqtm.children[1].props.children.props.saveGame

for(conduitFlowLoop = 0; conduitFlowLoop < tempSaveGame.gameData.liquidConduitFlow.versionedSerializedContents.length; conduitFlowLoop++){
    thisFlowNode = tempSaveGame.gameData.liquidConduitFlow.versionedSerializedContents[conduitFlowLoop];
    if(thisFlowNode.temperature>280){
        console.log("Node "+conduitFlowLoop+" temp: "+thisFlowNode.temperature)
        thisFlowNode.temperature=280
    }
}

for(conduitFlowLoop = 0; conduitFlowLoop < tempSaveGame.gameData.gasConduitFlow.versionedSerializedContents.length; conduitFlowLoop++){
    thisFlowNode = tempSaveGame.gameData.gasConduitFlow.versionedSerializedContents[conduitFlowLoop];
    if(thisFlowNode.temperature>280){
        console.log("Node "+conduitFlowLoop+" temp: "+thisFlowNode.temperature)
        thisFlowNode.temperature=280
    }
}

for(objectGroupLoop = 0; objectGroupLoop < tempSaveGame.gameObjects.length; objectGroupLoop++) {
  thisObjectGroup=tempSaveGame.gameObjects[objectGroupLoop];
  // console.log("Name: "+thisObjectGroup.name + " Object Count: "+thisObjectGroup.gameObjects.length);

  // Shorten Constructions
  if(thisObjectGroup.name.includes("UnderConstruction")){
    for(objectLoop = 0; objectLoop < thisObjectGroup.gameObjects.length; objectLoop++){
      thisObject=thisObjectGroup.gameObjects[objectLoop]
      // Grab behaviors,
      for(behaviorLoop = 0; behaviorLoop < thisObject.behaviors.length; behaviorLoop++){
        thisBehaviors = thisObject.behaviors[behaviorLoop]
        if(thisBehaviors.name=="Constructable") {
          constructionBehavior=thisBehaviors
        }
      }

      // then do things with them.
      if(constructionBehavior.templateData.workTimeRemaining!=1){
        console.log(thisObjectGroup.name+"["+objectLoop+"] workTimeRemaining was: "+constructionBehavior.templateData.workTimeRemaining+" is now 1")
        constructionBehavior.templateData.workTimeRemaining=1
      }
    }
  }

  // Charge Batteries
  if(thisObjectGroup.name.includes("Battery")){
    for(objectLoop = 0; objectLoop < thisObjectGroup.gameObjects.length; objectLoop++){
      thisObject=thisObjectGroup.gameObjects[objectLoop]
      // Grab behaviors,
      for(behaviorLoop = 0; behaviorLoop < thisObject.behaviors.length; behaviorLoop++){
        thisBehaviors = thisObject.behaviors[behaviorLoop]
        if(thisBehaviors.name.includes("Battery")) {
          batteryBehavior=thisBehaviors
        }
      }

      // then do things with them.
      if(batteryBehavior.templateData.joulesAvailable<19999){
        console.log(thisObjectGroup.name+"["+objectLoop+"] Battery behavior name: "+batteryBehavior.name+" joulesAvailable was: "+batteryBehavior.templateData.joulesAvailable)
        batteryBehavior.templateData.joulesAvailable=19999
      }
    }
  }

  // Duplicant Healing
  if(thisObjectGroup.name=="Minion"){
    for(objectLoop = 0; objectLoop < thisObjectGroup.gameObjects.length; objectLoop++){
      thisObject=thisObjectGroup.gameObjects[objectLoop]
      // Grab behaviors,
      for(behaviorLoop = 0; behaviorLoop < thisObject.behaviors.length; behaviorLoop++){
        thisBehaviors = thisObject.behaviors[behaviorLoop]
        switch(thisBehaviors.name){
          case "MinionIdentity":
            identityBehavior=thisBehaviors;
            break;
          case "MinionModifiers":
            modifiersBehavior=thisBehaviors;
            break;
        }
      }

      // then do things with them.
      minionName = identityBehavior.templateData.name
      for(extraDataLoop = 0; extraDataLoop < modifiersBehavior.extraData.amounts.length; extraDataLoop++){
        extraDataObject=modifiersBehavior.extraData.amounts[extraDataLoop]
        // console.log(extraDataObject.name)
        switch (extraDataObject.name) {
          case "HitPoints":
          case "Stamina":
          case "Breath":
            if(extraDataObject.value.value!=100){
              extraDataObject.value.value=100
              console.log("Name: "+minionName+" modifierName: "+extraDataObject.name+" val: "+extraDataObject.value.value)
            }
            break
          case "Calories":
            if(extraDataObject.value.value!=4000000){
              extraDataObject.value.value=4000000
              console.log("Name: "+minionName+" modifierName: "+extraDataObject.name+" val: "+extraDataObject.value.value)
            }
            break
          case "Bladder":
          case "Stress":
            if(extraDataObject.value.value!=0){
              extraDataObject.value.value=0
              console.log("Name: "+minionName+" modifierName: "+extraDataObject.name+" val: "+extraDataObject.value.value)
            }
            break
        }
      }
    }
  }

  // Temperatures! Set it to like 6.9C (nice)
  switch(thisObjectGroup.name){
    case "Dirt":
    case "Steel":
    case "SandStone":
    case "WireRefinedBridgeHighWattage":
    case "WireBridgeHighWattage":
    case "Wire":
    case "WireRefined":
    case "WireRefinedHighWattage":
    case "GasConduit":
    case "LiquidConduit":
    case "LiquidConduitRadiant":
    case "InsulatedLiquidConduit":
    case "SteamTurbine2":
    case "HydrogenGenerator":
    case "BunkerTile":
    case "Tile":
    case "BunkerDoor":
    case "ThermalBlock":
    case "MetalRefinery":
    case "SolidTransferArm":
    case "AutoMiner":
    case "FirePole":
    case "LiquidReservoir":
      for(objectLoop = 0; objectLoop < thisObjectGroup.gameObjects.length; objectLoop++){
        thisObject=thisObjectGroup.gameObjects[objectLoop]
        // Grab behaviors,
        for(behaviorLoop = 0; behaviorLoop < thisObject.behaviors.length; behaviorLoop++){
          thisBehaviors = thisObject.behaviors[behaviorLoop]
          if(thisBehaviors.name=="PrimaryElement") {
            objectPrimaryElement=thisBehaviors
          }
        }

        // then do things with them.
        if(objectPrimaryElement.templateData._Temperature>280){
          console.log(thisObjectGroup.name+"["+objectLoop+"] _Temperature was: "+objectPrimaryElement.templateData._Temperature+" is now 280K")
          objectPrimaryElement.templateData._Temperature=280
        }
      }
      break
  }

  // Make More
  switch(thisObjectGroup.name) {
    case "Steel":
    case "Diamond":
      for(objectLoop = 0; objectLoop < thisObjectGroup.gameObjects.length; objectLoop++){
        thisObject=thisObjectGroup.gameObjects[objectLoop]
        // Grab behaviors,
        for(behaviorLoop = 0; behaviorLoop < thisObject.behaviors.length; behaviorLoop++){
          thisBehaviors = thisObject.behaviors[behaviorLoop]
          if(thisBehaviors.name=="PrimaryElement") {
            objectPrimaryElement=thisBehaviors
          }
        }

        // then do things with them.
        // if(objectPrimaryElement.templateData.Units<25000){
        //   console.log(thisObjectGroup.name+"["+objectLoop+"] Units was: "+objectPrimaryElement.templateData.Units+" is now 25000")
        //   objectPrimaryElement.templateData.Units=25000
        // }
      }
    break
  }

}
console.log("done")
