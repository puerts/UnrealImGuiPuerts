// Fill out your copyright notice in the Description page of Project Settings.

#pragma once

#ifdef IMGUI_API
#include <ImGuiModule.h>
#endif

#include "CoreMinimal.h"
#include "UObject/NoExportTypes.h"
#include "DearImGuiManager.generated.h"

/**
 * 
 */
UCLASS()
class UNREALIMGUIPUERTS_API UDearImGuiManager : public UObject
{
	GENERATED_BODY()

	DECLARE_DYNAMIC_MULTICAST_DELEGATE(FSimpleNotify);

	UPROPERTY()
	FSimpleNotify OnDraw;

	UFUNCTION(BlueprintCallable)
	void SetInputMode(bool bEnabled) const;

#ifdef IMGUI_API
	FImGuiDelegateHandle DelegateHandle;
#endif

	void OnImGuiDraw();

public:
	UDearImGuiManager();

	~UDearImGuiManager();
};
